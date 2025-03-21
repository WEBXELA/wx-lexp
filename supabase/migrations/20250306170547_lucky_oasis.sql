/*
  # Update search limits functionality

  1. Changes
    - Modify increment_search_count function to handle 10 searches per day
    - Improve reset timing logic
    - Add last_search timestamp for accurate tracking
*/

-- Add last_search column to track the most recent search
ALTER TABLE search_limits 
ADD COLUMN IF NOT EXISTS last_search timestamptz DEFAULT now();

-- Update the function to handle 10 searches and better reset logic
CREATE OR REPLACE FUNCTION increment_search_count()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _user_id uuid;
  _last_reset timestamptz;
  _search_count integer;
  _last_search timestamptz;
BEGIN
  -- Get current user ID
  _user_id := auth.uid();
  
  -- Get or create user's search limits
  INSERT INTO search_limits (user_id, search_count, last_reset, last_search)
  VALUES (_user_id, 0, now(), now())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    search_count = 
      CASE 
        WHEN search_limits.last_search < now() - interval '24 hours'
        THEN 1
        ELSE search_limits.search_count + 1
      END,
    last_reset = 
      CASE 
        WHEN search_limits.last_search < now() - interval '24 hours'
        THEN now()
        ELSE search_limits.last_reset
      END,
    last_search = now()
  RETURNING last_reset, search_count, last_search INTO _last_reset, _search_count, _last_search;

  -- Return true if under limit, false if exceeded
  RETURN _search_count <= 10;
END;
$$;