"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000"

export default function AdminDashboard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/news`, {
        credentials: "include",
      })
      const data = await response.json()
      setNews(data)
    } catch (err) {
      console.error("Error al cargar noticias:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/admin/logout`, {
        method: "POST",
        credentials: "include",
      })
      navigate("/admin/login")
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta noticia?")) return

    try {
      const response = await fetch(`${API_BASE}/api/news/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setNews(news.filter((n) => n._id !== id))
      } else {
        alert("Error al eliminar la noticia")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Gestión de Noticias</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Noticias Publicadas</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Noticia
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando noticias...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay noticias</h3>
            <p className="text-gray-600">Comienza creando tu primera noticia</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                key={item._id}
                news={item}
                onEdit={() => setEditingNews(item)}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Create/Edit */}
      {(showCreateModal || editingNews) && (
        <NewsModal
          news={editingNews}
          onClose={() => {
            setShowCreateModal(false)
            setEditingNews(null)
          }}
          onSuccess={() => {
            loadNews()
            setShowCreateModal(false)
            setEditingNews(null)
          }}
        />
      )}
    </div>
  )
}

function NewsCard({ news, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {news.coverImageUrl && (
        <img src={`${API_BASE}${news.coverImageUrl}`} alt={news.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.body}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{formatDate(news.publishedAt)}</span>
          <span
            className={`px-2 py-1 rounded ${news.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
          >
            {news.isPublished ? "Publicada" : "Borrador"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

function NewsModal({ news, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: news?.title || "",
    body: news?.body || "",
    isPublished: news?.isPublished ?? true,
    image: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("body", formData.body)
      formDataToSend.append("isPublished", formData.isPublished)

      if (formData.image) {
        formDataToSend.append("image", formData.image)
      }

      const url = news ? `${API_BASE}/api/news/${news._id}` : `${API_BASE}/api/news`

      const method = news ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        credentials: "include",
        body: formDataToSend,
      })

      if (response.ok) {
        onSuccess()
      } else {
        const data = await response.json()
        setError(data.message || "Error al guardar la noticia")
      }
    } catch (err) {
      setError("Error de conexión con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{news ? "Editar Noticia" : "Nueva Noticia"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="Título de la noticia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              placeholder="Escribe el contenido de la noticia..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de portada</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
              Publicar inmediatamente
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : news ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
