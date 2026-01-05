"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000"

export default function AdminDashboard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [activeSection, setActiveSection] = useState("news") // "news" o "league"
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
              <p className="text-gray-600 mt-1">
                {activeSection === "news" ? "Gestión de Noticias" : "Gestión de Liga de Verano"}
              </p>
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
          <div className="flex gap-4 pb-4">
            <button
              onClick={() => setActiveSection("news")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeSection === "news" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Noticias
            </button>
            <button
              onClick={() => setActiveSection("league")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeSection === "league" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Liga de Verano
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "news" ? (
          <>
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
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
          </>
        ) : (
          <LeagueSection />
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

function LeagueSection() {
  const [categoria, setCategoria] = useState("caballeros_a")
  const [temporada] = useState("verano-2025")
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState("results") // "results", "teams", "matches"
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
  const [showCreateMatchModal, setShowCreateMatchModal] = useState(false)

  const categorias = [
    { key: "caballeros_a", label: "Caballeros A" },
    { key: "caballeros_b", label: "Caballeros B" },
    { key: "damas_a", label: "Damas A" },
    { key: "damas_b", label: "Damas B" },
    { key: "mixto_a", label: "Mixto A" },
    { key: "mixto_b", label: "Mixto B" },
  ]

  useEffect(() => {
    loadMatches()
    loadTeams()
  }, [categoria])

  const loadMatches = async () => {
    setLoading(true)
    try {
      console.log("[v0] Cargando partidos - categoria:", categoria, "temporada:", temporada)
      const response = await fetch(`${API_BASE}/api/league/matches/${categoria}?temporada=${temporada}`, {
        credentials: "include",
      })

      if (!response.ok) {
        console.error("[v0] Error HTTP:", response.status)
        setMatches([])
        return
      }

      const data = await response.json()
      console.log("[v0] Partidos recibidos:", data.length, data)
      setMatches(data)
    } catch (err) {
      console.error("Error al cargar partidos:", err)
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  const loadTeams = async () => {
    try {
      console.log("[v0] Cargando equipos - categoria:", categoria)
      const response = await fetch(`${API_BASE}/api/league/teams/${categoria}?temporada=${temporada}`, {
        credentials: "include",
      })

      if (!response.ok) {
        console.error("[v0] Error HTTP:", response.status)
        setTeams([])
        return
      }

      const data = await response.json()
      console.log("[v0] Equipos recibidos:", data.length, data)
      setTeams(data)
    } catch (err) {
      console.error("Error al cargar equipos:", err)
      setTeams([])
    }
  }

  const handleUpdateResult = async (matchId, result) => {
    try {
      const response = await fetch(`${API_BASE}/api/league/matches/${matchId}/result`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      })

      if (response.ok) {
        alert("Resultado actualizado correctamente")
        loadMatches()
        loadTeams() // Recargar equipos para ver tabla actualizada
      } else {
        const error = await response.json()
        alert(`Error: ${error.error || "Error al actualizar resultado"}`)
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  const handleCreateTeam = async (teamData) => {
    try {
      const response = await fetch(`${API_BASE}/api/league/teams`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...teamData, categoria }),
      })

      if (response.ok) {
        alert("Equipo creado correctamente")
        loadTeams()
        setShowCreateTeamModal(false)
      } else {
        alert("Error al crear equipo")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  const handleCreateMatch = async (matchData) => {
    try {
      const response = await fetch(`${API_BASE}/api/league/matches`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...matchData, categoria, temporada }),
      })

      if (response.ok) {
        alert("Partido creado correctamente")
        loadMatches()
        setShowCreateMatchModal(false)
      } else {
        alert("Error al crear partido")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  return (
    <div className="space-y-6">
      {/* Navegación entre vistas */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setView("teams")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === "teams" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Equipos
          </button>
          <button
            onClick={() => setView("matches")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === "matches" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Fixture
          </button>
          <button
            onClick={() => setView("results")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === "results" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cargar Resultados
          </button>
        </div>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
        >
          {categorias.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {view === "teams" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Equipos - {categorias.find((c) => c.key === categoria)?.label}</h3>
            <button
              onClick={() => setShowCreateTeamModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + Crear Equipo
            </button>
          </div>
          {teams.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600">No hay equipos creados para esta categoría</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {teams.map((team) => (
                <div key={team._id} className="bg-white rounded-lg shadow-sm p-4">
                  <h4 className="font-semibold text-lg">{team.nombre}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === "matches" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Fixture - {categorias.find((c) => c.key === categoria)?.label}</h3>
            <button
              onClick={() => setShowCreateMatchModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + Crear Partido
            </button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
            </div>
          ) : matches.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600">No hay partidos creados para esta categoría</p>
              <button
                onClick={() => setView("matches")}
                className="mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Crear partidos primero →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match._id} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{match.instancia}</p>
                      <p className="text-sm text-gray-500">
                        {match.fecha} - {match.horario}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{match.equipoLocal?.nombre || "TBD"}</span>
                      <span className="text-gray-400">vs</span>
                      <span>{match.equipoVisitante?.nombre || "TBD"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === "results" && (
        <>
          <h3 className="text-xl font-semibold">
            Cargar Resultados - {categorias.find((c) => c.key === categoria)?.label}
          </h3>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
              <p className="mt-4 text-gray-600">Cargando partidos...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600">No hay partidos cargados para esta categoría</p>
              <button
                onClick={() => setView("matches")}
                className="mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Crear partidos primero →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <MatchResultCard key={match._id} match={match} onUpdate={handleUpdateResult} />
              ))}
            </div>
          )}
        </>
      )}

      {showCreateTeamModal && (
        <CreateTeamModal
          onClose={() => setShowCreateTeamModal(false)}
          onCreate={handleCreateTeam}
          categoria={categorias.find((c) => c.key === categoria)?.label}
        />
      )}

      {showCreateMatchModal && (
        <CreateMatchModal
          onClose={() => setShowCreateMatchModal(false)}
          onCreate={handleCreateMatch}
          teams={teams}
          categoria={categorias.find((c) => c.key === categoria)?.label}
        />
      )}
    </div>
  )
}

function MatchResultCard({ match, onUpdate }) {
  const [showForm, setShowForm] = useState(false)
  const [detalleResultado, setDetalleResultado] = useState("")
  const [resultadoSerieLocal, setResultadoSerieLocal] = useState("")
  const [resultadoSerieVisitante, setResultadoSerieVisitante] = useState("")
  const [setsLocal, setSetsLocal] = useState("")
  const [setsVisitante, setSetsVisitante] = useState("")
  const [gamesLocal, setGamesLocal] = useState("")
  const [gamesVisitante, setGamesVisitante] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const result = {
      detalleResultado: detalleResultado.trim(),
      resultadoSerieLocal: resultadoSerieLocal ? Number.parseInt(resultadoSerieLocal) : undefined,
      resultadoSerieVisitante: resultadoSerieVisitante ? Number.parseInt(resultadoSerieVisitante) : undefined,
      setsLocal: setsLocal ? Number.parseInt(setsLocal) : undefined,
      setsVisitante: setsVisitante ? Number.parseInt(setsVisitante) : undefined,
      gamesLocal: gamesLocal ? Number.parseInt(gamesLocal) : undefined,
      gamesVisitante: gamesVisitante ? Number.parseInt(gamesVisitante) : undefined,
    }

    onUpdate(match._id, result)
    setShowForm(false)
  }

  const equipoLocal = match.equipoLocal?.nombre || match.nombreLocal || "TBD"
  const equipoVisitante = match.equipoVisitante?.nombre || match.nombreVisitante || "TBD"

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm font-semibold text-green-600">{match.instancia}</span>
          <p className="text-sm text-gray-500">
            {match.fecha} - {match.horario}
          </p>
        </div>
        {match.jugado && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Jugado</span>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-right pr-4">
          <p className="font-semibold text-lg">{equipoLocal}</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
          {match.jugado ? (
            <>
              <span className="text-2xl font-bold">{match.resultadoSerieLocal || match.setsLocal}</span>
              <span className="text-gray-400">-</span>
              <span className="text-2xl font-bold">{match.resultadoSerieVisitante || match.setsVisitante}</span>
            </>
          ) : (
            <span className="text-gray-400 font-medium">vs</span>
          )}
        </div>
        <div className="flex-1 pl-4">
          <p className="font-semibold text-lg">{equipoVisitante}</p>
        </div>
      </div>

      {match.jugado && match.detalleResultado && (
        <p className="text-center text-sm text-gray-500 mb-4">Detalle: {match.detalleResultado}</p>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {match.jugado ? "Editar Resultado" : "Cargar Resultado"}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resultado Serie {equipoLocal}</label>
              <input
                type="number"
                value={resultadoSerieLocal}
                onChange={(e) => setResultadoSerieLocal(e.target.value)}
                placeholder="2 o 3"
                min="0"
                max="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Serie ganada: 2 o 3 puntos</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resultado Serie {equipoVisitante}</label>
              <input
                type="number"
                value={resultadoSerieVisitante}
                onChange={(e) => setResultadoSerieVisitante(e.target.value)}
                placeholder="0 o 1"
                min="0"
                max="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Ejemplo: 2-1 o 3-0</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detalle del resultado (opcional - ej: 63 64 o 64 36 76)
            </label>
            <input
              type="text"
              value={detalleResultado}
              onChange={(e) => setDetalleResultado(e.target.value)}
              placeholder="63 64"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Si completas esto, se calculará automáticamente sets y games</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sets a favor {equipoLocal}</label>
              <input
                type="number"
                value={setsLocal}
                onChange={(e) => setSetsLocal(e.target.value)}
                placeholder="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sets a favor {equipoVisitante}</label>
              <input
                type="number"
                value={setsVisitante}
                onChange={(e) => setSetsVisitante(e.target.value)}
                placeholder="7"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Games a favor {equipoLocal}</label>
              <input
                type="number"
                value={gamesLocal}
                onChange={(e) => setGamesLocal(e.target.value)}
                placeholder="75"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Games a favor {equipoVisitante}</label>
              <input
                type="number"
                value={gamesVisitante}
                onChange={(e) => setGamesVisitante(e.target.value)}
                placeholder="68"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function CreateTeamModal({ onClose, onCreate, categoria }) {
  const [nombre, setNombre] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      alert("Por favor ingresa un nombre para el equipo")
      return
    }
    onCreate({ nombre: nombre.trim() })
    setNombre("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Crear Equipo - {categoria}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Equipo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Equipo 1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CreateMatchModal({ onClose, onCreate, teams, categoria }) {
  const [equipoLocal, setEquipoLocal] = useState("")
  const [equipoVisitante, setEquipoVisitante] = useState("")
  const [fecha, setFecha] = useState("")
  const [horario, setHorario] = useState("")
  const [instancia, setInstancia] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!equipoLocal || !equipoVisitante || !fecha || !horario || !instancia) {
      alert("Por favor completa todos los campos")
      return
    }
    if (equipoLocal === equipoVisitante) {
      alert("Los equipos deben ser diferentes")
      return
    }
    onCreate({
      equipoLocal,
      equipoVisitante,
      fecha,
      horario,
      instancia,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Crear Partido - {categoria}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equipo Local</label>
            <select
              value={equipoLocal}
              onChange={(e) => setEquipoLocal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Seleccionar equipo...</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equipo Visitante</label>
            <select
              value={equipoVisitante}
              onChange={(e) => setEquipoVisitante(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Seleccionar equipo...</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instancia</label>
            <input
              type="text"
              value={instancia}
              onChange={(e) => setInstancia(e.target.value)}
              placeholder="Ej: Fecha 1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Horario</label>
            <input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
