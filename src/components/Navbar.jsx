import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  //Scroll si estamos en home
  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-1 text-2xl font-bold tracking-wide">
            <img src="LOGO.png" alt="" className='h-12 w-12 object-contain' />
            <span>Parque Tenis Club</span>
          </Link>

          {/* Menú */}
          <div className="hidden md:flex gap-6 items-center">
            <NavLink to="/contacto" className="hover:text-accent transition">
              Contacto
            </NavLink>
            <NavLink to="/torneo" className="hover:text-accent transition">
              Circuito del Parque
            </NavLink>
                        <NavLink to="/LigaVeranoInvierno" className="hover:text-accent transition">
              Liga de Verano Invierno
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
          <NavLink to="/contacto" onClick={() => setIsOpen(false)}>Contacto</NavLink>
          <NavLink to="/torneo" onClick={() => setIsOpen(false)}>Circuito del Parque</NavLink>
          <NavLink to="/ligaveranoinvierno" onClick={() => setIsOpen(false)}>Liga de Verano Invierno</NavLink>
        </div>
      )}


    </>
  );
}