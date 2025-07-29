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
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);

  const fetchFunction = async () => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_SOME_KEY
        }&s=${input}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setProduct(data.Search);
      } else {
        setProduct([]);
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
        setProduct([]);
      }
    }, 500); // debounce: 500ms

    return () => clearTimeout(timerId);
  }, [input]);

  const handleSubmit = (e) => e.preventDefault();

  const addInput = (id) => {
    const selected = product.find((item) => item.imdbID === id);
    if (selected) {
      setInput(selected.Title);
      setShow(false);
    }
  };

  return (
    <div className="min-h-screen  p-6 flex justify-center items-start">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onFocus={() => setShow(true)}
            onBlur={() => setTimeout(() => setShow(false), 100)}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>

          {product.length > 0 && show && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
              {product.map((item) => (
                <div
                  key={item.imdbID}
                  className="p-3 hover:bg-gray-100 cursor-pointer transition"
                  onMouseDown={() => addInput(item.imdbID)}
                >
                  {item.Title}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
