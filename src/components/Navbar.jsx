import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const handleScrolltoSection = (sectionId) => {
    navigate("/", { replace: false }); // redirige a la home
    setTimeout(() => {
      const el = document.getElementById(sectionId);
        const yOffset = -80; // opcional: desplaza para que no tape el navbar
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        scrollintovier ({ top: y, behavior: 'smooth' });
    }, 100); // espera a que cargue la home antes de hacer scroll
  };

  // Cerrar el menú al scrollear
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="bg-primary text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 text-2xl font-bold tracking-wide">
            <img src="LOGO.png" alt="" className='h-12 w-12 object-contain' />
            <span>Parque Tenis Club</span>
          </Link>

          {/* Menú */}
          <div className="hidden md:flex gap-6 items-center">
            <button onClick={() => handleScrolltoSection("equipos")} className="hover:text-accent transition">
              Equipos
            </button>

            <button onClick={() => handleScrolltoSection("entrenamiento")} className="hover:text-accent transition">
              Entrenamiento
            </button>
            <NavLink to="/torneo" className="hover:text-accent transition">
              Circuito del Parque
            </NavLink>
            <NavLink to="/contacto" className="hover:text-accent transition">
              Contacto
            </NavLink>
          </div>


          {/* Mobile menu toggle (placeholder) */}
          <div className="md:hidden">
            <button
              className="text-white text-3xl"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Menú mobile desplegable */}
      {isOpen && (
        <div className="md:hidden fixed top-[56px] right-1 w-48 bg-secondary text-white flex flex-col items-center gap-4 py-4 z-40 shadow-lg animated-fade-in-down">
          <a href="#entrenamiento" onClick={() => setIsOpen(false)}>Entrenamiento</a>
          <a href="#equipos" onClick={() => setIsOpen(false)}>Equipos</a>
          <NavLink to="/torneo" onClick={() => setIsOpen(false)}>Circuito del Parque</NavLink>
          <NavLink to="/contacto" onClick={() => setIsOpen(false)}>Contacto</NavLink>
        </div>
      )}


    </>
  );
}