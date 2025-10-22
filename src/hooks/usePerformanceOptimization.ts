import { useCallback, useEffect, useRef } from 'react';

// Hook to optimize performance by debouncing expensive operations
export const usePerformanceOptimization = () => {
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Debounce function to delay expensive operations
  const debounce = useCallback((
    fn: (...args: any[]) => void, 
    delay: number, 
    key: string
  ) => {
    return (...args: any[]) => {
      // Clear existing timeout for this key
      if (timeoutRefs.current.has(key)) {
        clearTimeout(timeoutRefs.current.get(key)!);
      }
      
      // Set new timeout
      const timeoutId = setTimeout(() => {
        fn(...args);
        timeoutRefs.current.delete(key);
      }, delay);
      
      timeoutRefs.current.set(key, timeoutId);
    };
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  return { debounce };
};