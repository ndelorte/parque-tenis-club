export default function Footer() {
  return (
    <footer className="bg-neutral text-white py-4 mt-20">
      <div className=" md:max-w-screen-xl md:mx-auto md:px-60 container mx-auto px-4 flex flex-col md:flex-row flex-wrap justify-between gap-10 text-sm text-center md:text-left">

        {/* Logo + Nombre */}
        <div className="flex-1 min-w-[200px] flex flex-col items-center  mx-auto md:mx-0 text-left md:text-left">
          <h4 className="text-white font-semibold mb-2">Parque Tenis Club</h4>
          <p className=" text-gray-300 text-xs">Viví el club</p>
          <img src="LOGO.png" alt="" className="w-16 mt-2"/>
        </div>

        {/* Contacto */}
        <div className="flex-1 min-w-[200px] flex flex-col items-center md:items-start mx-auto md:mx-0 text-left md:text-left">
          <h4 className="text-white font-semibold mb-2">Contacto</h4>
          <p>📍 Primera Junta 726, Quilmes</p>
          <p>📞 1157287851</p>
          <div className="flex items-center gap-2">
            <span>📧 </span>
            <span>parquetenisclub23@gmail.com</span>
          </div>
          <a
            href="https://www.instagram.com/parquetenisclub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <img src="/Instagram_logo_2016.svg" alt="Instagram" className="w-4 h-4" />
            <span>@parquetenisclub</span>
          </a>
        </div>

        {/* Horarios */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white font-semibold mb-2">Horarios</h4>
          <p>Lunes a Viernes: 8 a 24hs</p>
          <p>Sábados y Domingos: 8 a 20hs</p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-xs mt-5 px-4">
        © {new Date().getFullYear()} Parque Tenis Club
      </div>
      <div className="text-center text-gray-400 text-[10px] mt-5 px-4">
        Desarrollado por Nicolas Delorte
      </div>
    </footer>
  );
}