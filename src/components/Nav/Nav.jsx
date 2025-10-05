
export default function NewsHeader() {
  return (
    <header className="w-full border-b border-gray-300">
      {/* Top Section - Logo */}
      <div className="bg-neutral-900 text-white py-3 px-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase">
          Global<span className="text-red-500">News</span>
        </h1>
        <p className="text-sm tracking-wide text-gray-300 italic">
          “La verdad importa.”
        </p>
      </div>

      {/* Bottom Section - Navigation */}
      <nav className="bg-white px-6 py-2 flex items-center justify-center space-x-8 text-sm font-semibold text-gray-700 uppercase tracking-wide">
        <a href="#" className="hover:text-red-600 transition-colors">
          Mundo
        </a>
        <a href="#" className="hover:text-red-600 transition-colors">
          Economía
        </a>
        <a href="#" className="hover:text-red-600 transition-colors">
          Deportes
        </a>
        <a href="#" className="hover:text-red-600 transition-colors">
          Cultura
        </a>
        <a href="#" className="hover:text-red-600 transition-colors">
          Ciencia
        </a>
        <a href="#" className="hover:text-red-600 transition-colors">
          Opinión
        </a>
      </nav>
    </header>
  );
}
