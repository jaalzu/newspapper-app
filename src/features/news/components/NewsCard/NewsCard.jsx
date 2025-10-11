import styles from './NewsCard.module.css';
import { useFavoritesContext } from '../../../favoritesNews/useFavoritesContext';

export default function NewsCard({ article, compact }) {
  const { toggle, isFavorite } = useFavoritesContext();

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(article);
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-2 transition-all duration-300 relative ${styles.card}`}
    >
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 z-10 text-2xl"
      >
        {isFavorite(article.url) ? '❤️' : '🤍'}
      </button>

      {article.image_url && (
  <img
    src={article.image_url}
    alt={article.title}
    className="w-full object-cover mb-2 aspect-video"
  />
)}

      <p className={`font-bold mb-1 text-xl ${styles.title}`}>
        {article.title}
      </p>

      {!compact && article.description && (
        <p className="text-gray-700 text-sm mb-1 line-clamp-2">
          {article.description}
        </p>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500">
{article.pubDate && (
  <span>{new Date(article.pubDate).toLocaleDateString()}</span>
)}        {article.source?.name && (
          <span className="bg-gray-200 px-1 py-0.5 rounded text-gray-700 text-[0.6rem]">
            {article.source.name}
          </span>
        )}
      </div>
    </a>
  );
}
