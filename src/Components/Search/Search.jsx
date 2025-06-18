import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noImage from '../../assets/noImage.png';

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      if (!debouncedQuery.trim()) {
        setSearched(false);
        setMovies([]);
        setError("");
        return;
      }

      setSearched(true);
      setError("");
      setMovies([]);

      try {
        const firstPageRes = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            debouncedQuery
          )}&page=1&api_key=c7558ccb1e92b084efd7b8647dc31771`
        );

        const allResults = [...firstPageRes.data.results];
        const totalPages = firstPageRes.data.total_pages;

        const pageRequests = [];
        for (let page = 2; page <= Math.min(totalPages, 5); page++) {
          pageRequests.push(
            axios.get(
              `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                debouncedQuery
              )}&page=${page}&api_key=c7558ccb1e92b084efd7b8647dc31771`
            )
          );
        }

        const responses = await Promise.all(pageRequests);
        responses.forEach((res) => {
          allResults.push(...res.data.results);
        });

        if (allResults.length === 0) {
          setError("No movies found");
        }

        setMovies(allResults.slice(0, 10));

      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      }
    };

    fetchAllMovies();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Search Movies
      </h1>

      <div className="form-control w-full max-w-md mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
          className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      {!searched ? (
        <div className="text-center text-white opacity-60">
          <FaFilm size={80} className="mx-auto mb-4" />
          <p className="text-lg">Enter a movie title to start searching</p>
        </div>
      ) : error ? (
        <div className="text-center text-white opacity-60">
          <FaFilm size={80} className="mx-auto mb-4" />
          <p className="text-lg">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="text-white text-center cursor-pointer hover:scale-105 transition-transform duration-200"
            >
             <img
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : noImage
  }
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  }}
  alt={movie.title}
  className="rounded shadow-lg mx-auto"
/>

              <p className="mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
