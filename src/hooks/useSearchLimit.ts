import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSearchLimit() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState(true); // Always true to remove limits

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Not authenticated');
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      setError(err instanceof Error ? err.message : 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  const incrementSearchCount = async () => {
    return true; // Always allow searches
  };

  return {
    searchCount: 0,
    isLoading,
    error,
    incrementSearchCount,
    remainingSearches: Infinity,
    hasSubscription: true
  };
}

export async function checkSubscriptionStatus() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      throw error;
    }

    return data.status === 'active';
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}
