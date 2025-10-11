// src/features/news/hooks/useFetchNews.js
import { useState, useEffect } from 'react'
import { fetchNews } from '../api/NewsApi'

export function useFetchNews({ country = 'us', category, q } = {}) {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    async function loadNews() {
      setIsLoading(true)
      try {
        const apiUrl = `/api/news?country=${country}${
         category ? `&category=${category}` : ''
        }${q ? `&q=${q}` : ''}`;


        const data = await fetchNews(apiUrl)
        setNews(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [country, category, q])

  return { news, isLoading, error }
}
