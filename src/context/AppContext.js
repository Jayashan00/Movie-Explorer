import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AppContext = createContext(null);

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() =>
    read('movie_explorer_user', null)
  );

  const [favorites, setFavorites] = useState(() =>
    read('movie_explorer_favorites', [])
  );

  const [lastSearch, setLastSearch] = useState(
    () => localStorage.getItem('movie_explorer_last_search') || ''
  );

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('movie_explorer_theme') !== 'light'
  );

  useEffect(() => {
    localStorage.setItem(
      'movie_explorer_user',
      JSON.stringify(user)
    );
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      'movie_explorer_favorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    if (lastSearch) {
      localStorage.setItem(
        'movie_explorer_last_search',
        lastSearch
      );
    }
  }, [lastSearch]);

  useEffect(() => {
    localStorage.setItem(
      'movie_explorer_theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const login = useCallback((username) => {
    setUser({ username });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const toggleFavorite = useCallback((movie) => {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== movie.id
        );
      }

      return [movie, ...previous];
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((movie) => movie.id === id),
    [favorites]
  );

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      favorites,
      toggleFavorite,
      isFavorite,
      lastSearch,
      setLastSearch,
      darkMode,
      setDarkMode,
    }),
    [
      user,
      login,
      logout,
      favorites,
      toggleFavorite,
      isFavorite,
      lastSearch,
      darkMode,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);