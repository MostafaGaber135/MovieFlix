import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaStar, FaBars, FaTimes } from "react-icons/fa";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition ${
      isActive ? "bg-red-600 text-white" : "text-white hover:bg-gray-800"
    }`;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-black px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <NavLink
        to="/"
        className="text-2xl font-bold text-red-600 hover:text-red-400 transition duration-200"
      >
        MovieFlix
      </NavLink>

      <button
        className="text-white text-2xl md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col absolute top-full left-0 w-full bg-black text-white px-6 py-4 md:flex md:flex-row md:static md:w-auto md:gap-6 md:items-center`}
      >
        <NavLink to="/" className={navLinkClass}>
          <FaHome />
          Home
        </NavLink>

        <NavLink to="/search" className={navLinkClass}>
          <FaSearch />
          Search
        </NavLink>

        <NavLink to="/favorites" className={navLinkClass}>
          <FaStar />
          Favorites
        </NavLink>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
