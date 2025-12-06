import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';
import { getCurrentUser } from '../utils/api';

interface PremiumStatus {
  user: User | null;
  isPremium: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePremiumStatus(): PremiumStatus {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    isPremium: user?.isPremium ?? false,
    isLoading,
    error,
    refetch: fetchUser,
  };
}
