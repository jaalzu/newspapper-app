import styles from './NewsCard.module.css'

export default function NewsCard({ article, large }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300 
        ${large ? 'h-full' : ''} ${styles.card}`}
    >
      <div className={`overflow-hidden rounded-lg mb-4 
        ${large ? 'h-72' : 'h-48'} ${styles.imageContainer}`}>
        <img
          src={article.urlToImage || '/placeholder.jpg'}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <h2
        className={`font-semibold mb-3 line-clamp-3 ${styles.title} ${
          large ? 'text-xl' : 'text-lg'
        }`}
      >
        {article.title}
      </h2>
      
      <p className={`text-gray-600 mb-4 line-clamp-3 ${styles.description} ${
        large ? 'text-base' : 'text-sm'
      }`}>
        {article.description}
      </p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
        {article.source?.name && (
          <span className="bg-gray-100 px-2 py-1 rounded">
            {article.source.name}
          </span>
        )}
      </div>
    </a>
  )
}