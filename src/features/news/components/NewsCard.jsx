import styles from './NewsCard.module.css'

export default function NewsCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-xl shadow p-4 hover:shadow-md transition ${styles.card}`}
    >
      <img
        src={article.urlToImage || '/placeholder.jpg'}
        alt={article.title}
        className={`w-full h-48 object-cover rounded-lg mb-3 ${styles.image}`}
      />
      <h2
        className={`text-lg mb-2 ${styles.title}`}
      >
        {article.title}
      </h2>
      <p className={`text-sm mb-3 ${styles.description}`}>
        {article.description}
      </p>
    </a>
  )
}
