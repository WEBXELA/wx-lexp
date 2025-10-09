import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { checkSearchLimit, incrementSearchCount as incrementSearchCountUtil } from '../utils/searchLimits';

export function useSearchLimit() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);
  const [maxSearches, setMaxSearches] = useState(10);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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

      const currentUserId = session.session.user.id;
      setUserId(currentUserId);

      // Get search limit info using the new utility
      const limitInfo = await checkSearchLimit(currentUserId);
      
      setSearchCount(limitInfo.dailyCount);
      setMaxSearches(limitInfo.maxSearches);
      setHasSubscription(limitInfo.maxSearches > 10); // Premium/Pro plans have more than 10 searches

    } catch (err) {
      console.error('Error checking limits:', err);
      setError(err instanceof Error ? err.message : 'Error checking search limits');
    } finally {
      setIsLoading(false);
    }
  };

  const incrementSearchCount = async () => {
    try {
      if (!userId) return false;

      const success = await incrementSearchCountUtil(userId);
      
      if (success) {
        // Refresh limits after increment
        await checkLimits();
      }

      return success;
    } catch (err) {
      console.error('Error incrementing search count:', err);
      setError(err instanceof Error ? err.message : 'Error updating search count');
      return false;
    }
  };

  const getTimeUntilReset = (): string | null => {
    // Since we're using daily limits, show time until midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const remainingSearches = hasSubscription ? Infinity : Math.max(0, maxSearches - searchCount);
  const timeUntilReset = getTimeUntilReset();

  return {
    searchCount,
    isLoading,
    error,
    incrementSearchCount,
    remainingSearches,
    hasSubscription,
    timeUntilReset,
    maxSearches
  };
}