import ApiCard from "../components/ApiCard";
import { useState, useEffect } from "react";
import { searchAPIs, getPopularAPIs } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apis, setApis] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularAPIs = async () => {
      try {
        const popularAPIs = await getPopularAPIs();
        setApis(popularAPIs);
      } catch (err) {
        setError("No se pudieron cargar las APIs...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularAPIs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchAPIs(searchQuery);
      setApis(searchResults);
      setError(null);
    } catch (err) {
      setError("No se pudieron buscar las APIs...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
  <form
    onSubmit={handleSearch}
    className="flex flex-col sm:flex-row sm:max-w-xl sm:mx-auto sm:gap-0 gap-2 mb-6"
  >
    <div className="flex w-full">
      <input
        type="text"
        placeholder="Buscar APIs públicas..."
        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors duration-150"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-700 hover:border-gray-600 active:scale-95 transition-all duration-150"
      >
        Buscar
      </button>
    </div>
  </form>

  {error && (
    <div className="text-red-500 text-center mb-4">{error}</div>
  )}

  {loading ? (
    <div className="text-center text-gray-400">Cargando...</div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {apis.map((api) => (
        <ApiCard api={api} key={api.id} />
      ))}
    </div>
  )}
</div>
  );
}
export default Home;