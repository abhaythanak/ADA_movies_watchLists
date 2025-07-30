import { useWatchlist } from "../context/WatchlistContext";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-600">No movies added yet.</p>
      ) : (
        <ul className="space-y-4">
          {watchlist.map((movie) => (
            <li
              key={movie.imdbID}
              className="flex items-center gap-4 border p-3 rounded"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/50x70"
                }
                alt={movie.Title}
                className="w-12 h-16 object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{movie.Title}</h2>
                <p className="text-sm text-gray-500">{movie.Year}</p>
              </div>
              <button
                onClick={() => removeFromWatchlist(movie.imdbID)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
