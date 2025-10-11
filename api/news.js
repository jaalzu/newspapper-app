export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const country = searchParams.get('country') || 'us';
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    // ✅ Solo disponible en serverless / Node
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key missing' }), { status: 500 });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${country}${
      category ? `&category=${category}` : ''
    }${q ? `&q=${q}` : ''}&apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    return new Response(JSON.stringify({ articles: data.articles }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
