export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost"); // 👈 base fake

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

    const res = await fetch(url);

    if (!res.ok) {
      return Response.json(
        { error: `External API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
