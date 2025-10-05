import { useState, useEffect } from "react";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const apiUrl = import.meta.env.VITE_NEWS_API_URL;

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [apiKey, apiUrl]);

  if (loading) return <p>Cargando noticias...</p>;
  if (!articles.length) return <p>No hay noticias disponibles.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Noticias de último momento</h2>
      <ul className="flex flex-col gap-4">
        {articles.map((article) => (
          <li key={article.url} className="border-b pb-2">
            {article.urlToImage && (
              <img
                width={100}
                height={100}
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto mb-2 rounded"
              />
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              {article.title}
            </a>
            {article.description && (
              <p className="text-gray-700">{article.description}</p>
            )}
            <p className="text-sm text-gray-500">
              Fuente: {article.source.name} | {new Date(article.publishedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
