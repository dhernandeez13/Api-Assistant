import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(stored);
    }
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`w-9 h-9 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400/50
        ${theme === "dark"
          ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
          : "bg-white text-indigo-500 hover:bg-indigo-50"
        }`}
      title="Change theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggle;
