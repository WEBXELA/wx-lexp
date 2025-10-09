import { supabase } from '../lib/supabase';

export interface SearchLimitInfo {
  canSearch: boolean;
  dailyCount: number;
  maxSearches: number;
  remainingSearches: number;
}

/**
 * Check if user can perform a search based on their subscription plan
 */
export async function checkSearchLimit(userId: string): Promise<SearchLimitInfo> {
  try {
    // Get user's subscription plan
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', userId)
      .single();

    if (subError) {
      console.error('Error fetching subscription:', subError);
      return {
        canSearch: false,
        dailyCount: 0,
        maxSearches: 10,
        remainingSearches: 0
      };
    }

    // Get current daily search count
    const { data: searchCount, error: countError } = await supabase
      .rpc('get_daily_search_count', { user_uuid: userId });

    if (countError) {
      console.error('Error fetching search count:', countError);
      return {
        canSearch: false,
        dailyCount: 0,
        maxSearches: 10,
        remainingSearches: 0
      };
    }

    const dailyCount = searchCount || 0;
    const plan = subscription?.plan || 'free';
    
    // Set max searches based on plan
    let maxSearches = 10; // Default free plan
    if (plan === 'premium') {
      maxSearches = 100;
    } else if (plan === 'pro') {
      maxSearches = 1000;
    }

    const remainingSearches = Math.max(0, maxSearches - dailyCount);
    const canSearch = dailyCount < maxSearches;

    return {
      canSearch,
      dailyCount,
      maxSearches,
      remainingSearches
    };
  } catch (error) {
    console.error('Error checking search limit:', error);
    return {
      canSearch: false,
      dailyCount: 0,
      maxSearches: 5,
      remainingSearches: 0
    };
  }
}

/**
 * Increment the user's daily search count
 */
export async function incrementSearchCount(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .rpc('increment_search_count', { user_uuid: userId });

    if (error) {
      console.error('Error incrementing search count:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error incrementing search count:', error);
    return false;
  }
}

/**
 * Get user's subscription plan
 */
export async function getUserSubscription(userId: string) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

/**
 * Upgrade user's subscription plan
 */
export async function upgradeSubscription(
  userId: string, 
  newPlan: 'free' | 'premium' | 'pro',
  status: 'active' | 'inactive' = 'active'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan: newPlan,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error upgrading subscription:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error upgrading subscription:', error);
    return false;
  }
}
