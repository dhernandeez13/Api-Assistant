const BASE_URL = "https://api.github.com/search/repositories";

export const getPopularAPIs = async () => {
  const response = await fetch(
    `${BASE_URL}?q=api+in:name,description+stars:>1000&sort=stars&order=desc&per_page=30`
  );
  const data = await response.json();
  return data.items || [];
};

export const searchAPIs = async (query) => {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}+api+in:name,description&sort=stars&order=desc&per_page=30`
  );
  const data = await response.json();
  return data.items || [];
};