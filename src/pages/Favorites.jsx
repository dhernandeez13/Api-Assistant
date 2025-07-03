import { useApiContext } from "../contexts/ApiContext";
import ApiCard from "../components/ApiCard";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favorites, setFavoritesReviewed } = useApiContext();
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
      return;
    }
    setFavoritesReviewed();
  }, [setFavoritesReviewed, userLoggedIn, navigate]);

  if (favorites && favorites.length > 0) {
    return (
      <div className="p-4 pt-20 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Your Favorite APIs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((api) => (
            <ApiCard api={api} key={api.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        You don't have any favorite APIs yet
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Start adding APIs to your favorites and they will appear here.
      </p>
    </div>
  );
}

export default Favorites;
