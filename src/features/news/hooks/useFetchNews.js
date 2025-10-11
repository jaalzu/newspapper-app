// hooks/useFetchNews.js
import { useState, useEffect } from 'react';
import { fetchNews } from '../features/news/Newsapi';

export function useFetchNews({ country = 'us', category, q }) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = { country };
        if (category) params.category = category;
        if (q) params.q = q;

        const articles = await fetchNews(params);
        setNews(articles);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [country, category, q]);

  return { news, isLoading, error };
}