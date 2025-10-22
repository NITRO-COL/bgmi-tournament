import { useEffect, useState } from 'react';
import { isAdmin } from '@/lib/adminAuth';

export const useAdminAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authenticated = isAdmin();
        setIsLoggedIn(authenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return { isLoggedIn, loading };
};