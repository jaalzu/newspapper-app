import "../src/styles/global.css"; // <-- tu CSS con variables, tipografía y resets
import MainLayout from './layouts/mainLayout.jsx'
import NewsPage from "./pages/NewsPage.jsx";

function App() {

  return (
    <>
    <MainLayout >
       <NewsPage />
    </MainLayout >
    </>
  )
}

export default App
