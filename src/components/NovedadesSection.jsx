"use client"

// components/NovedadesSection.jsx

import { useEffect, useState, useMemo } from "react"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000"

export default function NovedadesSection() {
  const [news, setNews] = useState([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [mostrarTodas, setMostrarTodas] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`${API_BASE}/api/news`)
        const newsData = await r.json()
        setNews(Array.isArray(newsData) ? newsData : [])
      } catch (error) {
        console.error("Error al cargar las noticias:", error)
      } finally {
        setLoadingNews(false)
      }
    }
    load()
  }, [])

  // Mostrar 4 o todas según el estado
  const noticiasVisibles = useMemo(() => {
    return mostrarTodas ? news : news.slice(0, 4)
  }, [mostrarTodas, news])

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    if (Number.isNaN(fecha.getTime())) {
      return ""
    }
    return fecha.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getImageSrc = (coverImageUrl) => {
    if (!coverImageUrl) return "/placeholder.svg"
    if (coverImageUrl.startsWith("http")) return coverImageUrl
    return `${API_BASE}${coverImageUrl}`
  }

  return (
    <section id="novedades" className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">Últimas Novedades</h2>

      {loadingNews ? (
        <p className="text-center text-gray-500">Cargando noticias...</p>
      ) : noticiasVisibles.length === 0 ? (
        <p className="text-center text-gray-500">No hay noticias disponibles.</p>
      ) : null}

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {noticiasVisibles.map((noticia) => (
          <article
            key={noticia.id}
            className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Imagen */}
            <div className="sm:w-48 sm:min-w-48 h-48 sm:h-auto">
              <img
                src={getImageSrc(noticia.coverImageUrl) || "/placeholder.svg"}
                alt={noticia.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="p-5 flex flex-col justify-center">
              <span className="text-sm text-gray-500 mb-1">{formatearFecha(noticia.fecha)}</span>
              <h3 className="text-lg font-semibold text-primary mb-2">{noticia.title}</h3>
              <p className="text-neutral text-sm leading-relaxed">{noticia.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Botón Ver más / Ver menos */}
      {news.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setMostrarTodas(!mostrarTodas)}
            className="bg-secondary hover:bg-accent text-white font-semibold py-2 px-6 rounded transition"
          >
            {mostrarTodas ? "Ver menos" : "Ver más noticias"}
          </button>
        </div>
      )}
    </section>
  )
}
