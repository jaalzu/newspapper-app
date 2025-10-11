// lib/fetchNews.js
export async function fetchNews(apiUrl) {
  try {
    if (!apiUrl || typeof apiUrl !== 'string') {
      throw new Error('Invalid URL for fetchNews');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data?.articles || !Array.isArray(data.articles)) {
      throw new Error('Invalid response format: missing articles array');
    }

    return data.articles;

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - server took too long to respond');
    }

    if (error instanceof TypeError) {
      throw new Error('Network error - check your connection');
    }

    throw new Error(error.message || 'Unknown error fetching news');
  }
}