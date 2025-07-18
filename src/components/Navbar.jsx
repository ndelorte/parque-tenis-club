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
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-accent font-semibold' : 'hover:text-accent transition'}>
            Inicio
          </NavLink>
          <NavLink to="/entrenamiento" className="hover:text-accent transition">
            Entrenamiento
          </NavLink>
          <NavLink to="/equipos" className="hover:text-accent transition">
            Equipos
          </NavLink>
          <NavLink to="/torneo" className="hover:text-accent transition">
            Torneo Interno
          </NavLink>
          <NavLink to="/contacto" className="hover:text-accent transition">
            Contacto
          </NavLink>
        </div>

        {/* CTA / Acción destacada */}
        <Link to="/reserva" className="hidden md:inline-block bg-secondary text-white px-4 py-2 rounded hover:bg-accent hover:text-neutral transition">
          Reservá tu cancha
        </Link>

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