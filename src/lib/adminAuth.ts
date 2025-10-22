// Client-side admin authentication utility
// Optimized version with early returns and reduced operations
import { authCache } from './authCache';

export const isAdmin = () => {
  // Check cache first
  const cachedStatus = authCache.getCachedAuthStatus();
  if (cachedStatus !== null) {
    return cachedStatus;
  }
  
  // Early return if window is not available
  if (typeof window === 'undefined') return false;
  
  // Check localStorage first (faster than cookie parsing)
  const isLoggedIn = !!localStorage.getItem('adminToken') || 
    (document.cookie.indexOf('adminToken=') !== -1);
  
  // Cache the result
  authCache.setAuthStatus(isLoggedIn);
  
  return isLoggedIn;
};

export const loginAdmin = (token: string) => {
  if (typeof window !== 'undefined') {
    // Clear auth cache
    authCache.clearCache();
    
    // Set admin token in localStorage for persistence
    localStorage.setItem('adminToken', token);
    
    // Also set admin token cookie for 1 hour (server-side validation)
    document.cookie = `adminToken=${token}; path=/; max-age=3600; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`;
  }
};

export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    // Clear auth cache
    authCache.clearCache();
    
    // Remove admin token from localStorage
    localStorage.removeItem('adminToken');
    
    // Remove admin token cookie
    document.cookie = "adminToken=; path=/; max-age=0; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}";
  }
};