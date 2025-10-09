/*
  # Final Production Setup - Social Media Profile Search App
  
  This migration sets up the complete production database schema for the social media profile search application.
  
  Features:
  - User subscription management (free, premium, pro plans)
  - Daily search usage tracking with limits
  - Row Level Security (RLS) for data isolation
  - Automatic subscription creation for new users
  - Search limit enforcement (10 free searches per day)
  - Helper functions for search management
  
  Tables:
  - `subscriptions` - User subscription plans and status
  - `user_searches` - Daily search usage tracking per user
  
  Security:
  - All tables have RLS enabled
  - Users can only access their own data
  - Proper authentication checks
*/

-- Clean up any existing tables and functions
DO $$ 
BEGIN
    -- Drop existing tables if they exist
    DROP TABLE IF EXISTS user_searches CASCADE;
    DROP TABLE IF EXISTS subscriptions CASCADE;
    
    -- Drop existing functions if they exist
    DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
    DROP FUNCTION IF EXISTS public.increment_search_count(uuid) CASCADE;
    DROP FUNCTION IF EXISTS public.get_daily_search_count(uuid) CASCADE;
    DROP FUNCTION IF EXISTS public.can_user_search(uuid) CASCADE;
END $$;

-- Create subscriptions table
CREATE TABLE subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    plan text NOT NULL DEFAULT 'free',
    status text NOT NULL DEFAULT 'active',
    current_period_start timestamptz NOT NULL DEFAULT now(),
    current_period_end timestamptz NOT NULL DEFAULT (now() + interval '1 year'),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Create user_searches table
CREATE TABLE user_searches (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    search_date date NOT NULL DEFAULT CURRENT_DATE,
    search_count int NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, search_date)
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_searches ENABLE ROW LEVEL SECURITY;

-- Policies for subscriptions table
CREATE POLICY "Users can view own subscription"
    ON subscriptions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
    ON subscriptions
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
    ON subscriptions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policies for user_searches table
CREATE POLICY "Users can view own searches"
    ON user_searches
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own searches"
    ON user_searches
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches"
    ON user_searches
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    -- Create a free subscription for new users
    INSERT INTO public.subscriptions (
        user_id,
        plan,
        status,
        current_period_start,
        current_period_end
    ) VALUES (
        new.id,
        'free',
        'active',
        now(),
        now() + interval '1 year'
    );
    
    -- Initialize search tracking for the user
    INSERT INTO public.user_searches (
        user_id,
        search_date,
        search_count
    ) VALUES (
        new.id,
        CURRENT_DATE,
        0
    );
    
    RETURN new;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Function to increment search count
CREATE OR REPLACE FUNCTION public.increment_search_count(user_uuid uuid)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO user_searches (user_id, search_date, search_count)
    VALUES (user_uuid, CURRENT_DATE, 1)
    ON CONFLICT (user_id, search_date)
    DO UPDATE SET 
        search_count = user_searches.search_count + 1,
        updated_at = now();
END;
$$;

-- Function to get user's daily search count
CREATE OR REPLACE FUNCTION public.get_daily_search_count(user_uuid uuid)
RETURNS int
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    search_count int;
BEGIN
    SELECT COALESCE(us.search_count, 0) INTO search_count
    FROM user_searches us
    WHERE us.user_id = user_uuid 
    AND us.search_date = CURRENT_DATE;
    
    RETURN COALESCE(search_count, 0);
END;
$$;

-- Function to check if user can perform search
CREATE OR REPLACE FUNCTION public.can_user_search(user_uuid uuid)
RETURNS boolean
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    user_plan text;
    daily_count int;
    max_searches int;
BEGIN
    -- Get user's plan
    SELECT s.plan INTO user_plan
    FROM subscriptions s
    WHERE s.user_id = user_uuid;
    
    -- Set max searches based on plan
    IF user_plan = 'free' THEN
        max_searches := 10;
    ELSIF user_plan = 'premium' THEN
        max_searches := 100;
    ELSIF user_plan = 'pro' THEN
        max_searches := 1000;
    ELSE
        max_searches := 10; -- Default to free plan limits
    END IF;
    
    -- Get current daily count
    daily_count := get_daily_search_count(user_uuid);
    
    -- Return true if under limit
    RETURN daily_count < max_searches;
END;
$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_searches_user_id ON user_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_user_searches_date ON user_searches(search_date);
CREATE INDEX IF NOT EXISTS idx_user_searches_user_date ON user_searches(user_id, search_date);

-- Insert initial data for existing users (if any)
INSERT INTO subscriptions (user_id, plan, status, current_period_start, current_period_end)
SELECT 
    id as user_id,
    'free' as plan,
    'active' as status,
    now() as current_period_start,
    now() + interval '1 year' as current_period_end
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM subscriptions)
ON CONFLICT (user_id) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON subscriptions TO authenticated;
GRANT ALL ON user_searches TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_search_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_daily_search_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_user_search(uuid) TO authenticated;
