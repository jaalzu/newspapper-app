// api/news.js
const newsCache = {};
const CACHE_TIME = 15 * 60 * 1000; // 15 minutos

export default async function handler(req) {
  try {
    const { country = 'us', category, q } = req.query;
    const cacheKey = `${country}:${category}:${q}`;

    // ✅ Si está en cache, devuelve inmediatamente
    if (newsCache[cacheKey]?.data && Date.now() - newsCache[cacheKey].time < CACHE_TIME) {
      console.log(`📦 Cache hit for ${cacheKey}`);
      return new Response(
        JSON.stringify({ articles: newsCache[cacheKey].data }),
        { status: 200 }
      );
    }

    const apiKey = process.env.NEWSDATA_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key missing' }),
        { status: 500 }
      );
    }

    // ⭐ NewsData.io endpoint
    let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}`;
    
    if (category) url += `&category=${category}`;
    if (q) url += `&q=${q}`;

    console.log(`🔄 Fetching from NewsData: ${url.substring(0, 50)}...`);

    // Timeout de 5 segundos (NewsData es más rápido)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`NewsData returned ${res.status}`);
    }

    const data = await res.json();
    
    // ⭐ NewsData devuelve "results" en lugar de "articles"
    const articles = data.results || [];

    // ✅ Guarda en cache
    newsCache[cacheKey] = {
      data: articles,
      time: Date.now()
    };

    console.log(`✅ Got ${articles.length} articles`);

    return new Response(
      JSON.stringify({ articles }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('❌ Error:', err.message);

    if (err.name === 'AbortError') {
      return new Response(
        JSON.stringify({ error: 'Request timeout - NewsData is slow' }),
        { status: 504 }
      );
    }

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}