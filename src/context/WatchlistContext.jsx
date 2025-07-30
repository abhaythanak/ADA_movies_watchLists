// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";

//  Create context
const WatchlistContext = createContext();

//  Create provider
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load watchlist from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage every time watchlist changes
  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch (err) {
      console.error("Error saving watchlist to localStorage:", err);
    }
  }, [watchlist]);

  // Add to watchlist
  const addToWatchlist = (movie) => {
    if (!movie?.imdbID) return;

    setWatchlist((prev) => {
      if (!prev.find((m) => m.imdbID === movie.imdbID)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  // Remove from watchlist
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

//  Hook for easy usage
export function useWatchlist() {
  return useContext(WatchlistContext);
}
