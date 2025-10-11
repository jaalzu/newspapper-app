export default async function handler(request, response) {
  const { searchParams } = new URL(request.url);

  const country = searchParams.get("country") || "us";
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "API key missing" }, { status: 500 });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}${
    category ? `&category=${category}` : ""
  }${q ? `&q=${q}` : ""}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
