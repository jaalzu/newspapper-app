// features/news/Newsapi.js
export async function fetchNews(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/news?${queryString}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data?.articles || !Array.isArray(data.articles)) {
      throw new Error('Invalid response format');
    }

    return data.articles;

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    if (error instanceof TypeError) {
      throw new Error('Network error');
    }

    throw new Error(error.message || 'Error fetching news');
  }
}