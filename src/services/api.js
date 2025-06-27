const BASE_URL = "https://api.github.com/search/repositories";

export const getPopularAPIs = async (page = 1, perPage = 60) => {
  const response = await fetch(
    `${BASE_URL}?q=api+in:name,description+stars:>1000&sort=stars&order=desc&per_page=${perPage}&page=${page}`
  );
  const data = await response.json();
  return {
    items: data.items || [],
    total: data.total_count || 0
  };
};

export const searchAPIs = async (query, page = 1, perPage = 30) => {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}+api+in:name,description&sort=stars&order=desc&per_page=${perPage}&page=${page}`
  );
  const data = await response.json();
  return {
    items: data.items || [],
    total: data.total_count || 0
  };
};