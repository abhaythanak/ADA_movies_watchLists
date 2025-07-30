import { createContext, useContext, useEffect, useState } from "react";

// 1. Create context
const WatchlistContext = createContext();

// 2. Create provider
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // 3. Functions to add/remove
  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (!prev.find((m) => m.imdbID === movie.imdbID)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

// 4. Hook for easy usage
export function useWatchlist() {
  return useContext(WatchlistContext);
}
