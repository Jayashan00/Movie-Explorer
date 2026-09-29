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
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
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
    localStorage.setItem('movie_explorer_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      'movie_explorer_favorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    if (lastSearch) {
      localStorage.setItem('movie_explorer_last_search', lastSearch);
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
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [movie, ...prev]
    );
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
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