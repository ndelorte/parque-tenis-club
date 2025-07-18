export default function Footer() {
  return (
    <footer className="bg-neutral text-white py-10 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row flex-wrap justify-between gap-10 text-sm text-center md:text-left">
        
        {/* Logo + Nombre */}
        <div className="flex-1 min-w-[200px]">
          <img src="/LOGO.png" alt="Parque Tenis Club" className="w-20 mx-auto md:mx-0 mb-2" />
          <p className="font-semibold">Parque Tenis Club</p>
          <p className="text-gray-300 text-xs">Viví el club</p>
        </div>

        {/* Contacto */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white font-semibold mb-2">Contacto</h4>
          <p>📍 Primera Junta 726, Quilmes</p>
          <p>📞 1157287851</p>
          <p>📧 parquetenisclub23@gmail.com</p>
        </div>

        {/* Horarios */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white font-semibold mb-2">Horarios</h4>
          <p>Lunes a Viernes: 8 a 22hs</p>
          <p>Sábados y Domingos: 8 a 20hs</p>
        </div>

        {/* Navegación */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white font-semibold mb-2">Navegación</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="#entrenamiento" className="hover:underline">Entrenamiento</a></li>
            <li><a href="/torneo" className="hover:underline">Torneo</a></li>
            <li><a href="/contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-400 text-xs mt-10 px-4">
        © {new Date().getFullYear()} Parque Tenis Club
      </div>
        <div className="text-center text-gray-400 text-[10px] mt-10 px-4">
        Desarrollado por Nicolas Delorte
      </div>
    </footer>
  );
}