// api/news.js
const newsCache = {};
const CACHE_TIME = 20 * 60 * 1000; // 20 minutos

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) return res;
      
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      // Espera un poco antes de reintentar
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

export default async function handler(req) {
  try {
    const { country = 'us', category, q } = req.query;
    const cacheKey = `${country}:${category}:${q}`;

    // ✅ Intenta cache primero
    if (newsCache[cacheKey]?.data && Date.now() - newsCache[cacheKey].time < CACHE_TIME) {
      return new Response(
        JSON.stringify({ articles: newsCache[cacheKey].data }),
        { status: 200 }
      );
    }

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key missing' }), { status: 500 });
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    if (category) url += `&category=${category}`;
    if (q) url += `&q=${q}`;

    // ⭐ Intenta 3 veces con pequeños delays
    const res = await fetchWithRetry(url);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const articles = data.articles || [];

    newsCache[cacheKey] = {
      data: articles,
      time: Date.now()
    };

    return new Response(
      JSON.stringify({ articles }),
      { status: 200 }
    );

  } catch (err) {
    console.error('Error:', err.message);
    return new Response(
      JSON.stringify({ error: 'NewsAPI unavailable, please try again later' }),
      { status: 503 }
    );
  }
}