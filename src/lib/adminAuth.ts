// Client-side admin authentication utility
export const isAdmin = () => {
  if (typeof window !== 'undefined') {
    // First check localStorage for persisted token
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      return true;
    }
    
    // Fallback to cookie check
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith('adminToken='));
  }
  return false;
};

export const loginAdmin = (token: string) => {
  if (typeof window !== 'undefined') {
    // Set admin token in localStorage for persistence
    localStorage.setItem('adminToken', token);
    
    // Also set admin token cookie for 1 hour (server-side validation)
    document.cookie = `adminToken=${token}; path=/; max-age=3600; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`;
  }
};

export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    // Remove admin token from localStorage
    localStorage.removeItem('adminToken');
    
    // Remove admin token cookie
    document.cookie = "adminToken=; path=/; max-age=0; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}";
  }
};