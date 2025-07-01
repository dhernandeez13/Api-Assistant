import ApiCard from "../components/ApiCard";
import { useState, useEffect } from "react";
import { searchAPIs, getPopularAPIs } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apis, setApis] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState("");
  const [minStars, setMinStars] = useState(0);
  const [license, setLicense] = useState("");

  const languageColors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Go: "#00ADD8",
    Java: "#b07219",
    Ruby: "#701516",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Shell: "#89e051",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Rust: "#dea584",
    Dart: "#00B4AB",
    Vue: "#41b883",
    ObjectiveC: "#438eff",
    Scala: "#c22d40",
  };

  const topics = Array.from(
    new Set(apis.flatMap((api) => api.topics || []))
  ).sort();

  const owners = Array.from(
    new Set(apis.map((api) => api.owner?.login).filter(Boolean))
  ).sort();

  const [topic, setTopic] = useState("");
  const [owner, setOwner] = useState("");
  const [recent, setRecent] = useState(false);

  const [apiPage, setApiPage] = useState(1);
  const [totalApiResults, setTotalApiResults] = useState(0);
  const perPageApi = 60;

  useEffect(() => {
    const loadPopularAPIs = async () => {
      setLoading(true);
      try {
        const { items, total } = await getPopularAPIs(apiPage, perPageApi);
        setApis(items);
        setTotalApiResults(total);
      } catch (err) {
        setError("No se pudieron cargar las APIs...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularAPIs();
  }, [apiPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const { items, total } = await searchAPIs(
        searchQuery,
        apiPage,
        perPageApi
      );
      setApis(items);
      setTotalApiResults(total);
      setError(null);
    } catch (err) {
      setError("No se pudieron buscar las APIs...");
    } finally {
      setLoading(false);
    }
  };

  const totalApiPages = Math.ceil(totalApiResults / perPageApi);

  const languages = Array.from(
    new Set(apis.map((api) => api.language).filter(Boolean))
  ).sort();
  const licenses = Array.from(
    new Set(apis.map((api) => api.license?.spdx_id).filter(Boolean))
  ).sort();

  const filteredApis = apis.filter((api) => {
    const matchesLanguage = language ? api.language === language : true;
    const matchesStars = api.stargazers_count >= minStars;
    const matchesLicense = license ? api.license?.spdx_id === license : true;
    const matchesTopic = topic ? (api.topics || []).includes(topic) : true;
    const matchesOwner = owner ? api.owner?.login === owner : true;
    const matchesRecent = recent
      ? Date.now() - new Date(api.updated_at) < 1000 * 60 * 60 * 24 * 30
      : true;
    return (
      matchesLanguage &&
      matchesStars &&
      matchesLicense &&
      matchesTopic &&
      matchesOwner &&
      matchesRecent
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 18;

  const paginatedApis = filteredApis.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filteredApis.length / perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, language, license, topic, owner, minStars, recent, apis]);

  return (
    <div className="p-4 pt-20 mt-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row sm:max-w-xl sm:mx-auto sm:gap-0 gap-2 mb-6"
      >
        <div className="flex w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-indigo-300 transition-all dark:bg-gray-800 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search public APIs..."
            className="flex-1 px-4 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-700 hover:border-gray-600 active:scale-95 transition-all duration-150"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-50 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-colors duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 "
        >
          <option value="">Language</option>
          {languages.map((lang) => (
            <option
              value={lang}
              key={lang}
              style={{
                color: languageColors[lang] || "#222",
                background: "#fff",
              }}
            >
              {lang}
            </option>
          ))}
        </select>
        <select
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="w-40 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-colors duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800"
        >
          <option value="">License</option>
          {licenses.map((lic) => (
            <option value={lic} key={lic}>
              {lic}
            </option>
          ))}
        </select>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-50 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-colors duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800"
        >
          <option value="">Topic</option>
          {topics.map((t) => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedApis.map((api) => (
              <ApiCard api={api} key={api.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`px-3 py-1 rounded border border-gray-700 mx-0.5 ${
                    n === currentPage
                      ? "bg-gray-950/80 text-white font-bold"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Home;
