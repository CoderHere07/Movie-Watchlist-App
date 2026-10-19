import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch {
      return [];
    }
  });
  const [customMovies, setCustomMovies] = useState([]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );
  }, []);

  const removeFromWatchlist = useCallback((id) => {
    setWatchlist((prev) => prev.filter((m) => m.imdbID !== id));
  }, []);

  const addCustomMovie = useCallback((movie) => {
    setCustomMovies((prev) => [movie, ...prev]);
  }, []);

  const watchlistCount = useMemo(() => watchlist.length, [watchlist]);

  const value = {
    watchlist,
    watchlistCount,
    customMovies,
    addToWatchlist,
    removeFromWatchlist,
    addCustomMovie,
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}