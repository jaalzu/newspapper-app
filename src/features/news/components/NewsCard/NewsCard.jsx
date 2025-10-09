import styles from './NewsCard.module.css'

export default function NewsCard({ article, compact }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-2 transition-all duration-300 ${styles.card}`} // <- hover via CSS
    >
      {article.urlToImage && (
        <img
  src={article.urlToImage}
  alt={article.title}
  className="w-full object-cover mb-2 aspect-video"
/>
      )}
      <p className={`font-bold mb-1 text-xl ${styles.title}`}>
        {article.title}
      </p>

      {/* Solo mostramos descripción si no es compact */}
      {!compact && article.description && (
        <p className="text-gray-700 text-sm mb-1 line-clamp-2">
          {article.description}
        </p>
      )}

      {/* Fecha y fuente */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        {article.source?.name && (
          <span className="bg-gray-200 px-1 py-0.5 rounded text-gray-700 text-[0.6rem]">
            {article.source.name}
          </span>
        )}
      </div>
    </a>
  )
}
