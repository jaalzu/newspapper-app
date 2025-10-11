// api/news.js
const newsCache = {};
const CACHE_TIME = 15 * 60 * 1000; // 15 minutos

export default async function handler(req) {
  try {
    const { country = 'us', category, q } = req.query;
    const cacheKey = `${country}:${category}:${q}`;

    // ✅ Si está en cache, DEVUELVE INMEDIATAMENTE
    if (newsCache[cacheKey]?.data && Date.now() - newsCache[cacheKey].time < CACHE_TIME) {
      console.log(`📦 Cache hit for ${cacheKey}`);
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

    console.log(`🔄 Fetching from NewsAPI: ${url}`);

    // ⭐ 10 segundos de timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`NewsAPI returned ${res.status}`);
    }

    const data = await res.json();
    const articles = data.articles || [];

    // ✅ GUARDA EN CACHE
    newsCache[cacheKey] = {
      data: articles,
      time: Date.now()
    };

    console.log(`✅ Cached ${articles.length} articles`);

    return new Response(
      JSON.stringify({ articles }),
      { status: 200 }
    );

  } catch (err) {
    console.error('❌ Error:', err.message);

    if (err.name === 'AbortError') {
      return new Response(
        JSON.stringify({ error: 'NewsAPI is slow. Please try again in a moment.' }),
        { status: 504 }
      );
    }

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}