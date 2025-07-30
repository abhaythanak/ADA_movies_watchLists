import { useWatchlist } from "../context/WatchlistContext";

export default function MovieCard({ displayedMovies }) {
  const { addToWatchlist, watchlist, removeFromWatchlist } = useWatchlist();
  return (
    <div className="w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {displayedMovies.map((movie) => (
        <div
          key={movie.imdbID}
          className="relative group overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="w-full h-80 "
          />

          {/* default movie show for good experiance*/}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white flex flex-col justify-end min-h-24">
            <h2 className="text-lg font-semibold truncate">{movie.Title}</h2>
            <p className="text-sm mb-2">{movie.Year}</p>
            <button
              className={`${
                watchlist.some((m) => m.imdbID === movie.imdbID)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white py-1 px-3 rounded w-fit text-sm transition`}
              onClick={() =>
                watchlist.some((m) => m.imdbID === movie.imdbID)
                  ? removeFromWatchlist(movie.imdbID)
                  : addToWatchlist(movie)
              }
            >
              {watchlist.some((m) => m.imdbID === movie.imdbID)
                ? "Remove"
                : "Watchlist +"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
