import { createContext, useState, useContext, useEffect } from "react";

const ApiContext = createContext();

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (api) => {
    setFavorites((prev) => [...prev, api]);
  };

  const removeFromFavorites = (apiName) => {
    setFavorites((prev) => prev.filter((api) => api.API !== apiName));
  };

  const isFavorite = (apiName) => {
    return favorites.some((api) => api.API === apiName);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
