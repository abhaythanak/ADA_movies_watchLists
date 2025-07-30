import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

export default function Navbar() {
  const { watchlist } = useWatchlist();
  return (
    <header className="mx-auto mt-5 rounded-2xl w-full max-w-[600px] border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                className="h-10 w-auto"
                src="https://imgs.search.brave.com/l7USP3DSxA24RnUezB8n_HBFS9s76evqqWUrGYJX2T0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20va2FlcjEyMy9r/YWVyMTIzMjEwMy9r/YWVyMTIzMjEwMzAw/MDM4LzE2NjU1MDM3/OC1tLWxldHRlci1j/b2xvcmZ1bC1saW5l/LWxvZ28tZm9udC1z/dHlsZS12ZWN0b3It/ZGVzaWduLXRlbXBs/YXRlLWVsZW1lbnRz/LWZvci15b3VyLXN1/Y2Nlc3MuanBnP3Zl/cj02"
                alt="Logo"
              />
            </Link>
          </div>

          <nav className="flex gap-10">
            <Link
              to="/"
              className="text-sm font-bold text-gray-800 hover:text-gray-900"
            >
              Search
            </Link>
            <Link
              to="/watchlist"
              className="relative text-sm font-bold text-gray-800 hover:text-gray-900"
            >
              Watchlist{" "}
              <span className="absolute -top-3 left-12 text-gray-100 rounded-full bg-amber-500 w-5 h-5 text-center">
                {watchlist.length}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
