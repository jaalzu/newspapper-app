import NewsCardSkeleton from '../NewsCard/NewsCardSkeleton'

export default function NewsListSkeleton() {
  return (
    <div className="news-layout">
      {/* Layout desktop */}
      <div className="hidden sm:block">
        <div className="flex gap-8 mb-8 max-w-6xl mx-auto">
          {/* Noticia principal grande */}
          <div className="w-8/12">
            <NewsCardSkeleton large />
          </div>

          {/* Segunda noticia */}
          <div className="w-4/12">
            <NewsCardSkeleton />
          </div>
        </div>

        {/* Resto del grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NewsCardSkeleton key={i} compact />
            ))}
          </div>
        </div>
      </div>

      {/* Layout mobile */}
      <div className="lg:hidden">
        <div className="mb-10">
          <NewsCardSkeleton />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <NewsCardSkeleton key={i} compact />
          ))}
        </div>
      </div>
    </div>
  )
}
