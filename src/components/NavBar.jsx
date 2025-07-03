import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useApiContext } from "../contexts/ApiContext";
import { doSignOut } from "../firebase/auth";
import ThemeToggle from "./ThemeToggle";
import React, { useEffect, useState } from "react";
import { Clock, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const { favorites, showFavoritesIndicator } = useApiContext();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between shadow-md
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-white`}
    >
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        <Link to="/" onClick={handleLinkClick}>
          API Assitant
        </Link>
      </div>
      <div className="flex items-center gap-2 sm:gap-0">
        <div className="sm:hidden mr-2">
          <ThemeToggle />
        </div>

        <div className="sm:hidden mr-2">
          {userLoggedIn ? (
            <Link
              to="/profile"
              className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors w-10 h-10"
              title="Profile"
              onClick={handleLinkClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-900 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                />
              </svg>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-950 hover:bg-gray-400 dark:hover:bg-gray-950/70 transition-colors w-12 h-11"
              title="Iniciar sesión"
              onClick={handleLinkClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-900 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                />
              </svg>
            </Link>
          )}
        </div>

        <button
          className="sm:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        <div
          className={`flex-col sm:flex-row sm:flex gap-6 items-center
            fixed sm:static top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-md sm:shadow-none transition-all duration-300
            ${menuOpen ? "flex" : "hidden"} sm:flex px-6 sm:px-0 py-6 sm:py-0`}
          style={{ zIndex: 49 }}
        >
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium flex items-center gap-2"
            onClick={handleLinkClick}
          >
            Favorites
            {showFavoritesIndicator && (
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 dark:bg-sky-200 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-blue-500 dark:bg-blue-300"></span>
              </span>
            )}
          </Link>
          <Link
            to="/history"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium flex items-center gap-2"
            title="API History"
            onClick={handleLinkClick}
          >
            <Clock className="w-5 h-5" />
          </Link>
          <div className="hidden sm:block mt-4 sm:mt-0">
            <ThemeToggle />
          </div>
          <div className="hidden sm:block">
            {userLoggedIn ? (
              <Link
                to="/profile"
                className="ml-4 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors w-10 h-10"
                title="Profile"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-900 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-4 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-950 hover:bg-gray-400 dark:hover:bg-gray-950/70 transition-colors w-12 h-11"
                title="Iniciar sesión"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-900 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
