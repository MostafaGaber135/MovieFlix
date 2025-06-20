import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
      <div className="text-center animate-in fade-in zoom-in duration-700">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-white text-lg mb-6">
          The page you’re looking for doesn’t seem to exist.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
