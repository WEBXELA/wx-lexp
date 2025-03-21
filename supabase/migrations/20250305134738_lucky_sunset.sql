/*
  # Create search limits tracking

  1. New Tables
    - `search_limits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `search_count` (integer)
      - `last_reset` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `search_limits` table
    - Add policies for users to read/update their own limits
*/

CREATE TABLE IF NOT EXISTS search_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  search_count integer DEFAULT 0,
  last_reset timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE search_limits ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own limits
CREATE POLICY "Users can read own search limits"
  ON search_limits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to update their own limits
CREATE POLICY "Users can update own search limits"
  ON search_limits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to increment search count or create new record
CREATE OR REPLACE FUNCTION increment_search_count()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _user_id uuid;
  _last_reset timestamptz;
  _search_count integer;
BEGIN
  -- Get current user ID
  _user_id := auth.uid();
  
  -- Get or create user's search limits
  INSERT INTO search_limits (user_id, search_count, last_reset)
  VALUES (_user_id, 0, now())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    search_count = 
      CASE 
        WHEN search_limits.last_reset < now() - interval '24 hours'
        THEN 1
        ELSE search_limits.search_count + 1
      END,
    last_reset = 
      CASE 
        WHEN search_limits.last_reset < now() - interval '24 hours'
        THEN now()
        ELSE search_limits.last_reset
      END
  RETURNING last_reset, search_count INTO _last_reset, _search_count;

  -- Return true if under limit, false if exceeded
  RETURN _search_count <= 5;
END;
$$;