import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SearchLimits {
  search_count: number;
  last_reset: string;
  last_search: string;
}

export function useSearchLimit() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);
  const [lastSearch, setLastSearch] = useState<string | null>(null);
  const [lastReset, setLastReset] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    checkLimits();
  }, []);

  const checkLimits = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setError('Not authenticated');
        return;
      }

      // Get current search limits
      const { data: limits, error: limitsError } = await supabase
        .from('search_limits')
        .select('search_count, last_reset, last_search')
        .single();

      if (limitsError && limitsError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw limitsError;
      }

      if (limits) {
        setSearchCount(limits.search_count);
        setLastReset(limits.last_reset);
        setLastSearch(limits.last_search);
      }

      // TODO: Check subscription status
      setHasSubscription(false);

    } catch (err) {
      console.error('Error checking limits:', err);
      setError(err instanceof Error ? err.message : 'Error checking search limits');
    } finally {
      setIsLoading(false);
    }
  };

  const incrementSearchCount = async () => {
    try {
      if (hasSubscription) return true;

      const { data: result, error } = await supabase
        .rpc('increment_search_count');

      if (error) throw error;

      // Refresh limits after increment
      await checkLimits();

      return result;
    } catch (err) {
      console.error('Error incrementing search count:', err);
      setError(err instanceof Error ? err.message : 'Error updating search count');
      return false;
    }
  };

  const getTimeUntilReset = (): string | null => {
    if (!lastSearch) return null;

    const lastSearchDate = new Date(lastSearch);
    const resetTime = new Date(lastSearchDate.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    
    if (now >= resetTime) return null;

    const diff = resetTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const remainingSearches = hasSubscription ? Infinity : Math.max(0, 10 - (searchCount || 0));
  const timeUntilReset = getTimeUntilReset();

  return {
    searchCount,
    isLoading,
    error,
    incrementSearchCount,
    remainingSearches,
    hasSubscription,
    lastReset,
    timeUntilReset
  };
}