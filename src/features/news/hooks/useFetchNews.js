// src/features/news/hooks/useFetchNews.js
import { useState, useEffect } from 'react'
import { fetchNews } from '../api/NewsApi'

export function useFetchNews({ country = 'us', category, q } = {}) {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY

  useEffect(() => {
    if (!API_KEY) {
      setError('No API key found in .env')
      setIsLoading(false)
      return
    }

    async function loadNews() {
      setIsLoading(true)
      try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}${
          category ? `&category=${category}` : ''
        }${q ? `&q=${q}` : ''}&apiKey=${API_KEY}`

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
