// /api/news.js
export default async function handler(req, res) {
  const { country = 'us', category, q } = req.query;

  const apiKey = process.env.NEWS_API_KEY; // clave segura
  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}${
    category ? `&category=${category}` : ''
  }${q ? `&q=${q}` : ''}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
}
