export default function NewsCard({ article }) {
  return (
    <article className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
      <img
        src={article.urlToImage || '/placeholder.jpg'}
        alt={article.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
      <p className="text-sm text-gray-600 mb-3">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm hover:underline"
      >
        Leer más →
      </a>
    </article>
  )
}
