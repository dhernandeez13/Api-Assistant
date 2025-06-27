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
      className={`w-8 h-8 rounded-full p-2 transition-all duration-300 hover:cursor-pointer ${
        theme === "dark"
          ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
      title="Cambiar tema"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

export default ThemeToggle;
