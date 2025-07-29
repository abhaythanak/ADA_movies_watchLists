import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="mx-auto mt-5 rounded-2xl w-full max-w-[600px] border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                className="h-7 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Logo"
              />
            </Link>
            <span className="text-base font-semibold text-gray-800">
              MovieApp
            </span>
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
              className="text-sm font-bold text-gray-800 hover:text-gray-900"
            >
              Watchlist
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
