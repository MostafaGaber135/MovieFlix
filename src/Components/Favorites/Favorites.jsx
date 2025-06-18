import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import noImage from '../../assets/noImage.png';
export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const removeFromFavorites = (movieId) => {
    const updated = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    toast.success('Removed from favorites');
  };

  return (
    <div className="min-h-screen bg-black px-6 py-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-white opacity-50 text-lg">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="card bg-gray-900 text-white shadow-sm">
              <figure
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : noImage
                  }
                  alt={movie.title}
                />
              </figure>
              <div className="card-body">
                <h2
                  className="card-title justify-center text-xl mb-4 cursor-pointer hover:text-red-400"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  {movie.title}
                </h2>
                <div className="card-actions justify-center">
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => removeFromFavorites(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
