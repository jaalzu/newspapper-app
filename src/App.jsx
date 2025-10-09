// App.jsx
import "../src/styles/global.css";
import MainLayout from './layouts/mainLayout.jsx';
import NewsPage from "./pages/NewsPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './features/favoritesNews/FavoritesContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <MainLayout>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<NewsPage />} />

            <Route path="/favoritos" element={<FavoritesPage />} />


            {/* Rutas por categoría */}
            <Route path="/:category" element={<NewsPage />} />
          </Routes>
        </MainLayout>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;