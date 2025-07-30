import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [selectedMovieResult, setSelectedMovieResult] = useState(null);
  const [show, setShow] = useState(false);

  // Fetch random/default movies suggestions
  const fetchDefaultMovies = async () => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_SOME_KEY
        }&s=marvel`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setDefaultMovies(data.Search);
      }
    } catch (err) {
      console.error("Error fetching default movies:", err);
    }
  };

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  //  suggestions showing when typing
  const fetchFunction = async () => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_SOME_KEY
        }&s=${input}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setSuggestions(data.Search);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (input.trim() !== "") {
        fetchFunction();
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [input]);

  const handleSubmit = (e) => e.preventDefault();

  // When user clicks suggestion
  const addInput = (id) => {
    const selected = suggestions.find((item) => item.imdbID === id);
    if (selected) {
      setInput(selected.Title);
      setShow(false);
      setSelectedMovieResult([selected]); // Show clicked movie only
    }
  };

  // Final display: defaultMovies or selectedMovieResult
  const displayedMovies = selectedMovieResult || defaultMovies;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onFocus={() => setShow(true)}
            onBlur={() => setTimeout(() => setShow(false), 100)}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedMovieResult(null); // Reset result view when typing
            }}
            placeholder="Search for a movie..."
            className="w-full p-3 rounded-lg border border-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {suggestions.length > 0 && show && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
              {suggestions.map((item) => (
                <div
                  key={item.imdbID}
                  className="p-3 hover:bg-gray-100 cursor-pointer transition flex gap-5"
                  onMouseDown={() => addInput(item.imdbID)}
                >
                  <img src={item.Poster} className="w-10 h-10" alt="poster" />
                  {item.Title}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Movie Cards */}
      <MovieCard displayedMovies={displayedMovies} />
    </div>
  );
}
