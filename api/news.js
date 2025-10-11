// api/news.js
export default async function handler(req) {
  try {
    const { country = 'us', category, q } = req.query;

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500 }
      );
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    
    if (category) url += `&category=${category}`;
    if (q) url += `&q=${q}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: data.message || 'NewsAPI error' }),
        { status: res.status }
      );
    }

    return new Response(
      JSON.stringify({ articles: data.articles || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('News API error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}