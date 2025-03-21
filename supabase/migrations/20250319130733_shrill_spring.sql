/*
  # Fix search limit reset functionality

  1. Changes
    - Drop and recreate increment_search_count function with proper reset logic
    - Ensure search count resets to 0 after 24 hours from last search
    - Maintain 10 searches per 24-hour period
    - Track last search time accurately

  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing function
DROP FUNCTION IF EXISTS increment_search_count();

-- Recreate function with fixed reset logic
CREATE OR REPLACE FUNCTION increment_search_count()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_current_count INTEGER;
  v_last_search TIMESTAMPTZ;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();
  
  -- Get current search count and last search time
  SELECT search_count, last_search 
  INTO v_current_count, v_last_search
  FROM search_limits
  WHERE user_id = v_user_id;
  
  -- If no record exists, create one
  IF NOT FOUND THEN
    INSERT INTO search_limits (
      user_id, 
      search_count, 
      last_search, 
      last_reset
    )
    VALUES (
      v_user_id, 
      1, 
      NOW(), 
      NOW()
    );
    RETURN TRUE;
  END IF;
  
  -- If 24 hours have passed since last search, reset counter
  IF v_last_search < NOW() - INTERVAL '24 hours' THEN
    UPDATE search_limits
    SET 
      search_count = 1,
      last_search = NOW(),
      last_reset = NOW()
    WHERE user_id = v_user_id;
    RETURN TRUE;
  END IF;
  
  -- If within 24 hours and under limit, increment counter
  IF v_current_count < 10 THEN
    UPDATE search_limits
    SET 
      search_count = search_count + 1,
      last_search = NOW()
    WHERE user_id = v_user_id;
    RETURN TRUE;
  END IF;
  
  -- Return false if limit reached
  RETURN FALSE;
END;
$$;