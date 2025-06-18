import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaStar } from "react-icons/fa";

export default function Nav() {
  return (
    <div className="navbar bg-black px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <NavLink
        to="/"
        className="text-2xl font-bold text-red-600 hover:text-red-400 transition duration-200"
      >
        MovieFlix
      </NavLink>

      <div className="flex items-center gap-6 text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-red-600 text-white"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <FaHome />
          Home
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-red-600 text-white"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <FaSearch />
          Search
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-red-600 text-white"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <FaStar />
          Favorites
        </NavLink>
      </div>
    </div>
  );
}
