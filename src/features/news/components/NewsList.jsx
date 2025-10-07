import NewsCard from './NewsCard'
import { useFetchNews } from '../hooks/useFetchNews'

export default function NewsList({ country, category, q }) {
  const { news, isLoading, error } = useFetchNews({ country, category, q })

  if (isLoading) return <p className="text-center mt-6">Cargando noticias...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {news.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </section>
  )
}