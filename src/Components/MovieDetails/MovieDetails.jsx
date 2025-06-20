import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import noImage from '../../assets/noImage.png';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "c7558ccb1e92b084efd7b8647dc31771";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then((res) => setMovie(res.data))
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message || err);
        setError("Failed to load movie details");
      });
  }, [id]);

  if (error)
    return <div className="text-red-500 text-lg p-8 text-center">{error}</div>;

  if (!movie)
    return <div className="text-gray-300 text-lg p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-red-400 mb-6 text-center">
          {movie.title || "Untitled Movie"}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : noImage
            }
            alt={movie.title || "No Title"}
            className="rounded-2xl shadow-md w-full max-w-xs mx-auto md:mx-0"
          />
          <div className="space-y-4">
            <p className="text-gray-200 leading-relaxed">
              {movie.overview && movie.overview.trim().length > 0
                ? movie.overview
                : "No description available for this movie."}
            </p>
            <p>
              <span className="font-semibold text-red-300">Release Date:</span>{" "}
              {movie.release_date || "Unknown"}
            </p>
            <p>
              <span className="font-semibold text-red-300">Rating:</span>{" "}
              {movie.vote_average !== undefined ? movie.vote_average : "Not rated"}
            </p>
            <p>
              <span className="font-semibold text-red-300">Genres:</span>{" "}
              {movie.genres && movie.genres.length > 0
                ? movie.genres.map((g) => g.name).join(", ")
                : "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
