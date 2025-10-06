import { useState } from "react";
import "../../styles/global.css";
import "./Nav.css"; // CSS extra para scroll bonito

export default function NewsHeader() {
  const sections = [
    { name: "Mundo", href: "/mundo" },
    { name: "Economía", href: "/economia" },
    { name: "Deportes", href: "/deportes" },
    { name: "Cultura", href: "/cultura" },
    { name: "Ciencia", href: "/ciencia" },
    // { name: "Opinión", href: "/opinion" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-300">
      {/* Top Section - Logo */}
      <div
        className="py-3 px-2 md:px-6 flex items-center justify-between"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-bg)",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--font-extrabold)",
            textTransform: "uppercase",
          }}
          className="text-2xl md:text-3xl"
        >
          Global<span style={{ color: "var(--color-accent)" }}>News</span>
        </a>
      </div>

      {/* Bottom Section - Navigation */}
      <div className="relative py-2 px-2 md:px-6 flex items-center">
        {/* Botón menú visible solo en mobile */}
        <button
          className="md:hidden mr-2 px-2 py-1 border rounded text-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Secciones con scroll horizontal y scrollbar escondida */}
        <nav className="flex overflow-x-auto gap-4 scroll-hide">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-semibold)",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
              className="text-sm md:text-base flex-shrink-0 hover:text-red-600 transition-colors"
            >
              {section.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Menú desplegable completo debajo (mobile) */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-primary)] px-2 py-2 border-t border-gray-300">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-semibold)",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
              className="block py-1 text-sm hover:text-red-600 transition-colors"
            >
              {section.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
