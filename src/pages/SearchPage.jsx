// @ts-nocheck
// import { useEffect, useState } from "react";

// export default function SearchPage() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // Debounce logic (updates debouncedQuery after 500ms)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [query]);

//   // Fetch movie data when debouncedQuery updates
//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (!debouncedQuery) {
//         setResults([]);
//         return;
//       }

//       try {
//         const res = await fetch(
//           `https://www.omdbapi.com/?apikey=${
//             import.meta.env.VITE_OMDB_API_KEY
//           }&s=${debouncedQuery}`
//         );
//         const data = await res.json();
//         if (data.Response === "True") {
//           setResults(data.Search || []);
//         } else {
//           setResults([]);
//         }
//       } catch (err) {
//         console.error("Error fetching movies:", err);
//       }
//     };

//     fetchMovies();
//   }, [debouncedQuery]);

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search movies..."
//         className="w-full p-2 border rounded mb-4"
//       />

//       {results.length > 0 && (
//         <ul className="bg-white border rounded shadow p-2 max-h-80 overflow-auto">
//           {results.map((movie) => (
//             <li
//               key={movie.imdbID}
//               className="p-2 border-b hover:bg-gray-100 cursor-pointer"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={
//                     movie.Poster !== "N/A"
//                       ? movie.Poster
//                       : "https://via.placeholder.com/50x70"
//                   }
//                   alt={movie.Title}
//                   className="w-12 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="text-sm font-semibold">{movie.Title}</h3>
//                   <p className="text-xs text-gray-600">{movie.Year}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useWatchlist } from "../context/WatchlistContext";

// export default function SearchPage() {
//   const [input, setInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [defaultMovies, setDefaultMovies] = useState([]);
//   const [show, setShow] = useState(false);
//   const { addToWatchlist, watchlist, removeFromWatchlist } = useWatchlist();

//   const fetchDefaultMovies = async () => {
//     try {
//       const res = await fetch(
//         `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_SOME_KEY}`
//       );
//       const data = await res.json();
//       if (data.Response === "True") {
//         setDefaultMovies(data);
//       }
//     } catch (err) {
//       console.error("Error fetching default movies:", err);
//     }
//   };
//   useEffect(() => {
//     fetchDefaultMovies();
//   }, []);
//   const fetchFunction = async () => {
//     try {
//       const res = await fetch(
//         `https://www.omdbapi.com/?apikey=${
//           import.meta.env.VITE_SOME_KEY
//         }&s=${input}`
//       );
//       const data = await res.json();
//       if (data.Response === "True") {
//         setSuggestions(data.Search);
//       } else {
//         setSuggestions([]);
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       if (input.trim() !== "") {
//         fetchFunction();
//       } else {
//         setSuggestions([]);
//       }
//     }, 500); // debounce: 500ms

//     return () => clearTimeout(timerId);
//   }, [input]);

//   const handleSubmit = (e) => e.preventDefault();

//   const addInput = (id) => {
//     const selected = suggestions.find((item) => item.imdbID === id);
//     if (selected) {
//       setInput(selected.Title);
//       setShow(false);
//     }
//   };

//    const displayedMovies = input.trim() ? suggestions : defaultMovies;

//   return (
//     <div className="min-h-screen  p-6 flex justify-center items-start">
//       <div className="w-full max-w-md">
//         <form onSubmit={handleSubmit} className="relative">
//           <input
//             type="text"
//             value={input}
//             onFocus={() => setShow(true)}
//             onBlur={() => setTimeout(() => setShow(false), 100)}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Search for a movie..."
//             className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
//           >
//             Search
//           </button>

//           {suggestions.length > 0 && show && (
//             <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
//               {suggestions.map((item) => (
//                 <div
//                   key={item.imdbID}
//                   className="p-3 hover:bg-gray-100 cursor-pointer transition flex gap-5"
//                   onMouseDown={() => addInput(item.imdbID)}
//                 >
//                   <img src={item.Poster} className="w-10 h-10" alt="poster" />
//                   {item.Title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </form>
//         <div className="w-full max-w-3xl mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {displayedMovies.map((movie) => (
//           <div
//             key={movie.imdbID}
//             className="p-4 border rounded shadow flex gap-4 items-center"
//           >
//             <img
//               src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
//               alt={movie.Title}
//               className="w-24 h-36 object-cover"
//             />
//             <div>
//               <h2 className="font-bold">{movie.Title}</h2>
//               <p>{movie.Year}</p>
//               <button
//                 className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
//                 onClick={() =>
//                   watchlist.some((m) => m.imdbID === movie.imdbID)
//                     ? removeFromWatchlist(movie.imdbID)
//                     : addToWatchlist(movie)
//                 }
//               >
//                 {watchlist.some((m) => m.imdbID === movie.imdbID)
//                   ? "Remove from Watchlist"
//                   : "Add to Watchlist"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>

//     </div>
//   );
// }

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
      {/* <div className="w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedMovies.map((movie) => (
          <div
            key={movie.imdbID}
            className="relative group overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
              alt={movie.Title}
              className="w-full h-80 object-cover"
            />

            {/* default movie show for good experiance
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
    */}
      <MovieCard displayedMovies={displayedMovies} />
    </div>
  );
}
