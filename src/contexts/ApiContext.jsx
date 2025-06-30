import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getFavorites, addFavorite, removeFavorite } from "../firebase/favorites";

const ApiContext = createContext();

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [showFavoritesIndicator, setShowFavoritesIndicator] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      getFavorites(user.uid).then(favs => {
        setFavorites(favs);
        if (favs.length > 0) setShowFavoritesIndicator(true);
        else setShowFavoritesIndicator(false);
      });
    } else {
      setFavorites([]);
      setShowFavoritesIndicator(false);
    }
  }, [user]);

  const addToFavorites = async (api) => {
    if (!user) return;
    await addFavorite(user.uid, api);
    setFavorites((prev) => {
      if (prev.some((f) => f.id === api.id)) return prev;
      setShowFavoritesIndicator(true);
      return [...prev, api];
    });
  };

  const removeFromFavorites = async (apiId) => {
    if (!user) return;
    const apiToRemove = favorites.find((api) => api.id === apiId);
    if (!apiToRemove) return;
    await removeFavorite(user.uid, apiToRemove);
    setFavorites((prev) => prev.filter((api) => api.id !== apiId));
  };

  const isFavorite = (apiId) => {
    return favorites.some((api) => api.id === apiId);
  };

  const setFavoritesReviewed = () => setShowFavoritesIndicator(false);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    showFavoritesIndicator,
    setFavoritesReviewed,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
