import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import noImage from '../../assets/noImage.png';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    })
    
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.error("Axios Error:", err);
      });
  }, [page]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToFavorites = (movie) => {
    const alreadyAdded = favorites.some((fav) => fav.id === movie.id);
    if (!alreadyAdded) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      toast.success(`Added "${movie.title}" to favorites!`);
    } else {
      toast.error(`"${movie.title}" is already in favorites.`);
    }
  };

  return (
    <div className="px-6 py-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Popular Movies</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card w-full object-contain bg-transparent shadow-md "
          >
            <figure
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : noImage
                }
                alt={movie.title}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </figure>

            <div className="card-body bg-gray-900 text-white">
              <h2 className="card-title">{movie.title}</h2>
              <p>{movie.overview?.slice(0, 80)}...</p>
              <div className="card-actions justify-center ">
                <button
                  className="btn btn-sm bg-red-600 text-white hover:bg-red-700 "
                  onClick={() => handleAddToFavorites(movie)}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            «
          </button>

          {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, i) => {
            const pageNumber =
              i +
              (page <= 3
                ? 1
                : page >= totalPages - 2
                ? totalPages - 4
                : page - 2);
            if (pageNumber > totalPages) return null;
            return (
              <button
                key={pageNumber}
                className={`join-item btn btn-sm ${
                  page === pageNumber
                    ? "btn-active bg-red-600 text-white"
                    : "bg-gray-800 text-white"
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            className="join-item btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
