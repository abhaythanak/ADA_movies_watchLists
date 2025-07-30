import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState("watchlist");

  return (
    <WatchlistContext.Provider value={{ watchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}
