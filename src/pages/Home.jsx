import { useState } from 'react';
import Modal from '../components/Modal';
import EquipoCarousel from '../components/EquipoCarousel'




export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
     const [modalInfo, setModalInfo] = useState({ title: '', description: '' });

    const abrirModal = (titulo, descripcion) => {
      setModalInfo({ title: titulo, description: descripcion });
     setIsOpen(true);

  };
    return (
        <div className=" space-y-20">
            {/* HERO */}
            <section className="relative h-screen flex items-center justify-center text-white">
                {/* Imagen de fondo */}
                <img
                    src="/fondo3.jpeg"
                    alt="Cancha de tenis"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>

                {/* Contenido encima */}
                <div className="relative z-20 text-center max-w-xl p-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Bienvenidos a Parque Tenis Club
                    </h1>
                    <p className="mb-6 text-lg">Formamos jugadores, creamos comunidad.</p>
                    <a
                        href="#novedades"
                        className="bg-secondary hover:bg-accent text-white font-semibold py-2 px-4 rounded transition"
                    >
                        Conocé las últimas noticias
                    </a>
                </div>
            </section>

            {/* NOVEDADES */}
            <section id="novedades" className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold mb-6 text-primary">Últimas novedades</h2>
                <p className="text-neutral">Acá irían las noticias más recientes del club.</p>
            </section>

            {/* ENTRENAMIENTO */}
            <section id="entrenamiento" className=" container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center text-primary">Entrenamiento</h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* ESCUELITA */}
                    <div 
            onClick={() =>
              abrirModal(
                'Escuelita',
                'Entrenamiento para chicos/as desde los 5 años. Nivelación, juegos, técnica y trabajo en equipo.'
              )
            }className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transform transition-transform duration-300 text-black">
                        <img src="/fondo-escuelita.jpeg" alt="Escuelita de tenis" className="w-full h-52 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-primary mb-2">Escuelita</h3>
                            <p className="text-neutral">Clases lúdicas y técnicas para chicos/as desde 5 años. Grupos por edad y nivel. Profesores especializados en formación inicial.</p>
                        </div>
                    </div>

                    {/* ADULTOS */}
          <div
            onClick={() =>
              abrirModal(
                'Adultos',
                'Clases grupales o individuales, organizadas por niveles (iniciación, intermedios, avanzados).'
              )
            }
            className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transform transition-transform duration-300 text-black"
          >                        <img src="/fondo-entrenamiento.jpeg" alt="Clases para adultos" className="w-full h-52 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-primary mb-2">Adultos</h3>
                            <p className="text-neutral">Grupos de iniciación, intermedios y avanzados. Clases en horarios flexibles. Preparación física y técnica adaptada.</p>
                        </div>
                    </div>

                    {/* COMPETENCIA */}
<div
            onClick={() =>
              abrirModal(
                'Competencia',
                'Entrenamiento técnico, táctico y físico para jugadores federados y en competencia activa.'
              )
            }
            className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transform transition-transform duration-300 text-black"
          >                        <img src="/fondo-entrenaequipos.jpeg" alt="Entrenamiento de competencia" className="w-full h-52 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-primary mb-2">Competencia</h3>
                            <p className="text-neutral">Entrenamiento intensivo para jugadores federados e interclubes. Planificación táctica, física y técnica. Seguimiento personalizado.</p>
                        </div>
                    </div>
                </div>
                {/* Modal visible en toda la sección */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={modalInfo.title} description={modalInfo.description} />
            </section>

            {/* EQUIPOS */}
<section id="equipos" className="bg-white py-16">
  <div className="text-center mb-6">
    <h2 className="text-3xl font-bold text-primary">Nuestros Equipos</h2>
    <p className="text-gray-600 mt-2">Mirá todos los equipos representativos del club</p>
  </div>

  <div className="max-w-5xl mx-auto px-4">
    <EquipoCarousel />
  </div>
</section>

        </div>
    );
}