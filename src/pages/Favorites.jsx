import { useApiContext } from "../contexts/ApiContext";
import ApiCard from "../components/ApiCard";

function Favorites() {
  const { favorites } = useApiContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Tus APIs favoritas</h2>
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
      <h2 className="text-xl font-semibold text-white mb-2">No tienes APIs favoritas aún</h2>
      <p className="text-gray-400">Empieza a añadir APIs a tus favoritas y aparecerán aquí.</p>
    </div>
  );
}

export default Favorites;
