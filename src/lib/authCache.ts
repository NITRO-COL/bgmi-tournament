// Client-side authentication cache utility
// This helps reduce repeated authentication checks by caching the result

class AuthCache {
  private cache: { isLoggedIn: boolean; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 5000; // 5 seconds cache

  // Check if cache is valid
  private isCacheValid(): boolean {
    if (!this.cache) return false;
    return Date.now() - this.cache.timestamp < this.CACHE_DURATION;
  }

  // Get cached authentication status
  public getCachedAuthStatus(): boolean | null {
    if (this.isCacheValid()) {
      return this.cache?.isLoggedIn || false;
    }
    return null; // Cache expired or not set
  }

  // Set authentication status in cache
  public setAuthStatus(isLoggedIn: boolean): void {
    this.cache = {
      isLoggedIn,
      timestamp: Date.now()
    };
  }

  // Clear cache
  public clearCache(): void {
    this.cache = null;
  }
}

// Export singleton instance
export const authCache = new AuthCache();