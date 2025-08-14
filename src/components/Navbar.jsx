import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Parque Tenis Club
        </Link>

        {/* Menú */}
        <div className="hidden md:flex gap-6 items-center">
          <a href="#entrenamiento" className="hover:text-accent transition">
            Entrenamiento
          </a>
          <a href="#equipos" className="hover:text-accent transition">
            Equipos
          </a>
          <NavLink to="/torneo" className="hover:text-accent transition">
            Torneo Interno
          </NavLink>
          <NavLink to="/contacto" className="hover:text-accent transition">
            Contacto
          </NavLink>
        </div>


        {/* Mobile menu toggle (placeholder) */}
        <div className="md:hidden">
          <button className="text-white">
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}