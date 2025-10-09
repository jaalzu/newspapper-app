import NewsList from '../features/news/components/NewsList/NewsList'
import { useParams } from 'react-router-dom';

export default function NewsPage() {
    const { category } = useParams(); // <-- aquí tomás la categoría de la URL

    // dentro de NewsPage.jsx
const categoryMap = {
  mundo: null,           // null o undefined para "top headlines"
  economia: "business",
  deportes: "sports",
  cultura: "entertainment",
  ciencia: "science",
  opinion: "general",    // NewsAPI no tiene "opinion", podemos usar general
};

const apiCategory = category ? categoryMap[category.toLowerCase()] : undefined;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="max-w-7xl mx-auto"> {/* Contenedor máximo */}
        <h1 className="text-3xl mb-6 text-center">{category ? category.toUpperCase() : "Últimas Noticias"}</h1>
        <NewsList country="us"  category={apiCategory}/>
      </div>
    </main>
  )
}