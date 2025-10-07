import NewsCard from './NewsCard'
import { useFetchNews } from '../hooks/useFetchNews'

export default function NewsList({ country, category, q }) {
  const { news, isLoading, error } = useFetchNews({ country, category, q })

  if (isLoading) return <p className="text-center mt-6">Cargando noticias...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  // Tomamos la primera noticia como destacada
  const featuredArticle = news[0]
  const remainingArticles = news.slice(1)

  return (
    <div className="news-layout">
      {/* Layout para desktop */}
      <div className="hidden lg:block">
        <div className="flex gap-8 mb-8">
          {/* Noticia destacada - más grande */}
          <div className="flex-1">
            {featuredArticle && (
              <NewsCard article={featuredArticle} large={true} />
            )}
          </div>
          
          {/* Una noticia adicional al lado */}
          <div className="w-80 flex-shrink-0">
            {remainingArticles[0] && (
              <NewsCard article={remainingArticles[0]} />
            )}
          </div>
        </div>
        
        {/* Resto de las noticias debajo en grid */}
        {remainingArticles.length > 1 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {remainingArticles.slice(1).map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* Layout para mobile */}
      <div className="lg:hidden">
        {/* Noticia destacada */}
        {featuredArticle && (
          <div className="mb-6">
            <NewsCard article={featuredArticle} large={false} />
          </div>
        )}
        
        {/* Resto de las noticias */}
        <div className="grid gap-6 sm:grid-cols-2">
          {remainingArticles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}