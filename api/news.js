// api/news.js
const newsCache = {
  data: null,
  time: 0,
  CACHE_TIME: 60 * 60 * 1000 // 1 hora
};

export default async function handler(req) {
  try {
    const { country = 'us', category, q } = req.query;

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key missing' }), { status: 500 });
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    if (category) url += `&category=${category}`;
    if (q) url += `&q=${q}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const articles = data.articles || [];

        // ✅ Guarda si funciona
        newsCache.data = articles;
        newsCache.time = Date.now();

        return new Response(
          JSON.stringify({ articles }),
          { status: 200 }
        );
      }
    } catch (err) {
      console.error('NewsAPI failed:', err.message);
    }

    // Si falla, intenta devolver cache antiguo
    if (newsCache.data && newsCache.data.length > 0) {
      console.log('Using stale cache');
      return new Response(
        JSON.stringify({ 
          articles: newsCache.data,
          cached: true 
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ error: 'NewsAPI unavailable' }),
      { status: 503 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}