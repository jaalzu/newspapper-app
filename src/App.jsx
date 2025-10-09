import "../src/styles/global.css";
import MainLayout from './layouts/mainLayout.jsx'
import NewsPage from "./pages/NewsPage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<NewsPage />} />

          {/* Rutas por categoría */}
          <Route path="/:category" element={<NewsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App;
