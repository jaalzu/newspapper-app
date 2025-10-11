// src/features/api/NewsApi.js
export async function fetchNews(params = {}) {
  try {
    const apiKey = process.env.REACT_APP_NEWSDATA_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${params.country || 'us'}`;
    
    if (params.category) url += `&category=${params.category}`;
    if (params.q) url += `&q=${params.q}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NewsData returned ${response.status}`);
    }

    const data = await response.json();
    
    // ⭐ NewsData devuelve "results"
    const articles = data.results || [];
    
    return articles;

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