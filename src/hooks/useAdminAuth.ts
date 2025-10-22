import { useEffect, useState, useCallback } from 'react';
import { isAdmin } from '@/lib/adminAuth';

export const useAdminAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Memoized auth check function
  const checkAuthStatus = useCallback(() => {
    try {
      const authenticated = isAdmin();
      setIsLoggedIn(authenticated);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { isLoggedIn, loading, refreshAuth: checkAuthStatus };
};