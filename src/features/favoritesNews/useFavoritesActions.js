// hooks/favorites/useFavoritesActions.js
import { useCallback } from "react";

export function useFavoritesActions(favorites, setFavorites) {
  const add = useCallback((article) => {
    if (!article?.url) return;
    setFavorites(prev => {
      if (prev.some(a => a.url === article.url)) return prev;
      return [article, ...prev];
    });
  }, [setFavorites]);

  const remove = useCallback((url) => {
    setFavorites(prev => prev.filter(a => a.url !== url));
  }, [setFavorites]);

  const toggle = useCallback((article) => {
    if (!article?.url) return;
    setFavorites(prev => {
      const exists = prev.some(a => a.url === article.url);
      return exists 
        ? prev.filter(a => a.url !== article.url)
        : [article, ...prev];
    });
  }, [setFavorites]);

  const isFavorite = useCallback(
    (url) => favorites.some(a => a.url === url),
    [favorites]
  );

  return { add, remove, toggle, isFavorite };
}