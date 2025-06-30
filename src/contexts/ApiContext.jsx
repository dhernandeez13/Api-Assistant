import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getFavorites, addFavorite } from "../firebase/favorites";

const ApiContext = createContext();

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      getFavorites(user.uid).then(setFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addToFavorites = async (api) => {
    if (!user) return;
    await addFavorite(user.uid, api);
    setFavorites((prev) => {
      if (prev.some((f) => f.id === api.id)) return prev;
      return [...prev, api];
    });
  };

  const removeFromFavorites = (apiId) => {
    setFavorites((prev) => prev.filter((api) => api.id !== apiId));
  };

  const isFavorite = (apiId) => {
    return favorites.some((api) => api.id === apiId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
