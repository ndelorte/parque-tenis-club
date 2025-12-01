// components/NovedadesSection.jsx

import { useState } from 'react';

// Datos de ejemplo - después se reemplazan con datos de la base de datos
const noticiasEjemplo = [
  {
    id: 1,
    titulo: "Torneo Abierto de Verano 2025",
    descripcion: "Inscripciones abiertas para el torneo de verano. Categorías desde Sub-12 hasta +60. Premios para todos los finalistas.",
imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",    fecha: "2025-01-28"
  },
  {
    id: 2,
    titulo: "Nuevos horarios de escuelita",
    descripcion: "A partir de febrero, la escuelita tendrá nuevos horarios por la tarde. Consultá con tu profesor los cambios.",
imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",    fecha: "2025-01-25"
  },
  {
    id: 3,
    titulo: "El equipo Sub-16 clasificó a la final regional",
    descripcion: "Nuestros jugadores Sub-16 lograron un gran triunfo en el torneo interclubes y pasan a la final del próximo mes.",
imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",    fecha: "2025-01-20"
  },
  {
    id: 4,
    titulo: "Mantenimiento de canchas completado",
    descripcion: "Finalizamos el trabajo de mantenimiento en las canchas 3 y 4. Ya están habilitadas para su uso.",
imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",    fecha: "2025-01-15"
  },
  {
    id: 5,
    titulo: "Charla de nutrición deportiva",
    descripcion: "El próximo sábado a las 10hs, charla abierta sobre nutrición para deportistas a cargo de la Lic. María González.",
imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",    fecha: "2025-01-10"
  },
  {
    id: 6,
    titulo: "Inscripción abierta para interclubes",
    descripcion: "Ya podés anotarte para representar al club en el torneo interclubes 2025. Consultá con los profes.",
imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",    fecha: "2025-01-05"
  }
];

export default function NovedadesSection() {
  const [mostrarTodas, setMostrarTodas] = useState(false);
  
  // Mostrar 4 o todas según el estado
  const noticiasVisibles = mostrarTodas 
    ? noticiasEjemplo 
    : noticiasEjemplo.slice(0, 4);

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section id="novedades" className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        Últimas Novedades
      </h2>
      
      {/* Lista vertical de noticias */}
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {noticiasVisibles.map((noticia) => (
          <article 
            key={noticia.id}
            className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Imagen */}
            <div className="sm:w-48 sm:min-w-48 h-48 sm:h-auto">
              <img 
                src={noticia.imagen || "/placeholder.svg"} 
                alt={noticia.titulo}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Contenido */}
            <div className="p-5 flex flex-col justify-center">
              <span className="text-sm text-gray-500 mb-1">
                {formatearFecha(noticia.fecha)}
              </span>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {noticia.titulo}
              </h3>
              <p className="text-neutral text-sm leading-relaxed">
                {noticia.descripcion}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Botón Ver más / Ver menos */}
      {noticiasEjemplo.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setMostrarTodas(!mostrarTodas)}
            className="bg-secondary hover:bg-accent text-white font-semibold py-2 px-6 rounded transition"
          >
            {mostrarTodas ? 'Ver menos' : 'Ver más noticias'}
          </button>
        </div>
      )}
    </section>
  );
}