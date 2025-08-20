import { useState, useEffect, useCallback } from 'react';

// URL State Management Hook
export function useURLState() {
  const [urlParams, setUrlParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      q: params.get('q') || '',
      type: params.get('type') || '',
      sort: params.get('sort') || 'id',
      page: parseInt(params.get('page') || '1'),
      favorites: params.get('favorites') === 'true'
    };
  });

  const updateURL = useCallback((newParams: Partial<typeof urlParams>) => {
    const updatedParams = { ...urlParams, ...newParams };
    const searchParams = new URLSearchParams();
    
    if (updatedParams.q) searchParams.set('q', updatedParams.q);
    if (updatedParams.type) searchParams.set('type', updatedParams.type);
    if (updatedParams.sort !== 'id') searchParams.set('sort', updatedParams.sort);
    if (updatedParams.page !== 1) searchParams.set('page', updatedParams.page.toString());
    if (updatedParams.favorites) searchParams.set('favorites', 'true');

    const newURL = `${window.location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    window.history.pushState({}, '', newURL);
    setUrlParams(updatedParams);
  }, [urlParams]);

  return [urlParams, updateURL] as const;
}

// Debounced search hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Favorites hook
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const stored = localStorage.getItem('pokemon-favorites');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      localStorage.setItem('pokemon-favorites', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  }, []);

  return [favorites, toggleFavorite] as const;
}

// Theme hook - FIXED VERSION
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('pokemon-theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('pokemon-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    
    // Apply the theme immediately on mount
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setIsDark(shouldBeDark);
  }, []); // Only run once on mount

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('pokemon-theme', newTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newTheme);
      return newTheme;
    });
  }, []);

  return [isDark, toggleTheme] as const;
}