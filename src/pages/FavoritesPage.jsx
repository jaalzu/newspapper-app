// pages/FavoritesPage.jsx
import { useFavoritesContext } from '../features/favoritesNews/useFavoritesContext';

function FavoritesPage() {
  const { favorites, remove } = useFavoritesContext();

  if (favorites.length === 0) {
    return <p>No tienes favoritos guardados</p>;
  }

  return (
    <div>
      <h1>Mis Noticias Guardadas</h1>
      {favorites.map(article => (
        <div key={article.url}>
          <h3>{article.title}</h3>
          <button onClick={() => remove(article.url)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;