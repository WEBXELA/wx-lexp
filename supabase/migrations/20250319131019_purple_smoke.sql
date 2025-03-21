/*
  # Fix search limit reset functionality

  1. Changes
    - Completely reset search count to 0 after 24 hours
    - Add explicit check for time difference
    - Improve reset logic to ensure fresh start after 24 hours
*/

-- Drop existing function
DROP FUNCTION IF EXISTS increment_search_count();

-- Recreate function with improved reset logic
CREATE OR REPLACE FUNCTION increment_search_count()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_current_count INTEGER;
  v_last_search TIMESTAMPTZ;
  v_hours_since_last_search DOUBLE PRECISION;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();
  
  -- Get current search count and last search time
  SELECT 
    search_count, 
    last_search,
    EXTRACT(EPOCH FROM (NOW() - last_search))/3600 AS hours_since_last_search
  INTO 
    v_current_count, 
    v_last_search,
    v_hours_since_last_search
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
  
  -- If 24 hours have passed since last search, reset everything
  IF v_hours_since_last_search >= 24 THEN
    UPDATE search_limits
    SET 
      search_count = 1,  -- Start with 1 for the current search
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

-- Reset all existing search limits to ensure clean state
UPDATE search_limits
SET 
  search_count = 0,
  last_search = NOW() - INTERVAL '24 hours',
  last_reset = NOW() - INTERVAL '24 hours'
WHERE search_count >= 10;