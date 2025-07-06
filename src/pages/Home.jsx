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
        setError("Could not load APIs...");
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
      setError("Could not search APIs...");
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

  function getContrastColor(hex, isDark) {
    if (!hex) return isDark ? "#fff" : "#222";
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);

    const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;

    const bgLuminance = isDark ? 0 : 1;
    const contrast = (Math.max(luminance, bgLuminance) + 0.05) / (Math.min(luminance, bgLuminance) + 0.05);

    if (contrast < 4.5) {
      return isDark ? "#fff" : "#222";
    }
    return `#${hex}`;
  }

  return (
    <div className="p-2 sm:p-4 pt-20 mt-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row sm:max-w-xl sm:mx-auto sm:gap-0 gap-2 mb-6 mt-8"
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
          className="w-full sm:w-50 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-colors duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 mb-2 sm:mb-0"
        >
          <option value="">Language</option>
          {languages.map((lang) => (
            <option
              value={lang}
              key={lang}
            >
              {lang}
            </option>
          ))}
        </select>
        <select
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="w-full sm:w-40 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-colors duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 mb-2 sm:mb-0"
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
          className="w-full sm:w-50 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition-colors duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800"
        >
          <option value="">Topic</option>
          {topics.map((t) => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
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
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700 dark:text-gray-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        {error && (
          <div className="mt-6 text-center text-red-500 font-semibold">{error}</div>
        )}
      </>
    </div>
  );
}

export default Home;
