import NewsHeader from "../components/Nav/Nav";
import "../styles/global.css";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <NewsHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
