import NewsList from '../features/news/components/NewsList'

export default function NewsPage() {
  return (
    <main className="min-h-screen mx-12 bg-[var(--color-bg)] p-6 ">
      <h1 className="text-2xl   mb-6 text-center">Últimas Noticias</h1>

      <NewsList country="us" category="business" />

    </main>
  )
}
