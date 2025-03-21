/*
  # Fix search limit reset functionality

  1. Changes
    - Update increment_search_count function to properly reset after 24 hours
    - Add last_reset timestamp to track when the limit was last reset
    - Reset search_count to 0 when 24 hours have passed since last search

  2. Security
    - Enable RLS on search_limits table
    - Add policy for users to update their own limits
*/

-- Function to handle search count increment and reset
CREATE OR REPLACE FUNCTION increment_search_count()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
  last_search_time TIMESTAMPTZ;
  v_user_id UUID;
BEGIN
  -- Get the current user's ID
  v_user_id := auth.uid();
  
  -- Get current search count and last search time
  SELECT search_count, last_search INTO current_count, last_search_time
  FROM search_limits
  WHERE user_id = v_user_id;
  
  -- If no record exists, create one
  IF NOT FOUND THEN
    INSERT INTO search_limits (user_id, search_count, last_search, last_reset)
    VALUES (v_user_id, 1, NOW(), NOW());
    RETURN TRUE;
  END IF;
  
  -- Check if 24 hours have passed since last search
  IF last_search_time < NOW() - INTERVAL '24 hours' THEN
    -- Reset counter and update timestamps
    UPDATE search_limits
    SET search_count = 1,
        last_search = NOW(),
        last_reset = NOW()
    WHERE user_id = v_user_id;
    RETURN TRUE;
  END IF;
  
  -- If within 24 hours and under limit, increment counter
  IF current_count < 10 THEN
    UPDATE search_limits
    SET search_count = search_count + 1,
        last_search = NOW()
    WHERE user_id = v_user_id;
    RETURN TRUE;
  END IF;
  
  -- Limit reached within 24 hours
  RETURN FALSE;
END;
$$;

-- Ensure RLS is enabled
ALTER TABLE search_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own limits
CREATE POLICY "Users can read own search limits"
ON search_limits
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create policy for the function to update limits
CREATE POLICY "Users can update own search limits"
ON search_limits
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);