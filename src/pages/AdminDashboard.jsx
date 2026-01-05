"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BracketTree from "./BracketTree" // Importar el componente BracketTree

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000"

export default function AdminDashboard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [activeSection, setActiveSection] = useState("news") // "news", "league", o "circuit"
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
                {activeSection === "news" && "Gestión de Noticias"}
                {activeSection === "league" && "Gestión de Liga de Verano"}
                {activeSection === "circuit" && "Gestión de Circuito del Parque"}
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
            <button
              onClick={() => setActiveSection("circuit")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeSection === "circuit" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Circuito del Parque
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "news" && (
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
        )}
        {activeSection === "league" && <LeagueSection />}
        {activeSection === "circuit" && <CircuitSection />}
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

function CircuitSection() {
  const [view, setView] = useState("ranking") // "ranking", "tournaments", "brackets"
  const [categoria, setCategoria] = useState("single_primera")
  const [temporada] = useState("2025")
  const [ranking, setRanking] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [brackets, setBrackets] = useState([]) // Estado para almacenar los cuadros creados
  const [loading, setLoading] = useState(false)
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)
  const [showCreateBracketModal, setShowCreateBracketModal] = useState(false)

  const categorias = [
    { key: "single_primera", label: "Single Primera", grupo: "Caballeros Singles" },
    { key: "single_intermedia", label: "Single Intermedia", grupo: "Caballeros Singles" },
    { key: "single_segunda", label: "Single Segunda", grupo: "Caballeros Singles" },
    { key: "single_tercera", label: "Single Tercera", grupo: "Caballeros Singles" },
    { key: "single_cuarta", label: "Single Cuarta", grupo: "Caballeros Singles" },
    { key: "single_+50", label: "Single +50", grupo: "Caballeros Singles" },
    { key: "dobles_primera", label: "Dobles Primera", grupo: "Caballeros Dobles" },
    { key: "dobles_intermedia", label: "Dobles Intermedia", grupo: "Caballeros Dobles" },
    { key: "dobles_segunda", label: "Dobles Segunda", grupo: "Caballeros Dobles" },
    { key: "damas_single_primera", label: "Single Primera", grupo: "Damas Singles" },
    { key: "damas_single_segunda", label: "Single Segunda", grupo: "Damas Singles" },
    { key: "damas_single_tercera", label: "Single Tercera", grupo: "Damas Singles" },
    { key: "damas_dobles_primera", label: "Dobles Primera", grupo: "Damas Dobles" },
    { key: "damas_dobles_intermedia", label: "Dobles Intermedia", grupo: "Damas Dobles" },
    { key: "damas_dobles_segunda", label: "Dobles Segunda", grupo: "Damas Dobles" },
    { key: "mixto_primera", label: "Mixto Primera", grupo: "Mixto" },
    { key: "mixto_segunda", label: "Mixto Segunda", grupo: "Mixto" },
  ]

  useEffect(() => {
    if (view === "ranking") {
      loadRanking()
    } else if (view === "tournaments" || view === "brackets") {
      loadTournaments()
      // Al cambiar a la vista de brackets, cargar también los cuadros existentes
      if (view === "brackets") {
        loadBrackets()
      }
    }
  }, [view, categoria])

  // Cargar los cuadros existentes al entrar a la vista de brackets
  useEffect(() => {
    if (view === "brackets") {
      loadBrackets()
    }
  }, [view])

  const loadRanking = async () => {
    setLoading(true)
    try {
      console.log("[v0] Cargando ranking para:", { categoria, temporada })
      const response = await fetch(`${API_BASE}/api/circuit/ranking/${categoria}?temporada=${temporada}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Ranking cargado:", data.length, "jugadores")
        setRanking(data)
      } else {
        console.error("[v0] Error al cargar ranking, status:", response.status)
        setRanking([])
      }
    } catch (error) {
      console.error("[v0] Error al cargar ranking:", error)
      setRanking([])
    } finally {
      setLoading(false)
    }
  }

  const loadTournaments = async () => {
    setLoading(true)
    try {
      console.log("[v0] Cargando torneos para temporada:", temporada)
      const response = await fetch(`${API_BASE}/api/circuit/tournaments?temporada=${temporada}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Torneos cargados:", data.length)
        setTournaments(data)
      } else {
        console.error("[v0] Error al cargar torneos, status:", response.status)
        setTournaments([])
      }
    } catch (error) {
      console.error("[v0] Error al cargar torneos:", error)
      setTournaments([])
    } finally {
      setLoading(false)
    }
  }

  const loadBrackets = async () => {
    setLoading(true)
    try {
      console.log("[v0] Cargando cuadros para temporada:", temporada, "categoria:", categoria)
      const response = await fetch(`${API_BASE}/api/circuit/brackets?temporada=${temporada}&categoria=${categoria}`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Cuadros cargados:", data.length)
        setBrackets(data)
      } else {
        console.error("[v0] Error al cargar cuadros, status:", response.status)
        setBrackets([])
      }
    } catch (error) {
      console.error("[v0] Error al cargar cuadros:", error)
      setBrackets([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddPoints = async (playerData) => {
    try {
      const response = await fetch(`${API_BASE}/api/circuit/player`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...playerData, categoria, temporada }),
      })

      if (response.ok) {
        alert("Puntos agregados correctamente")
        loadRanking()
        setShowAddPlayerModal(false)
      } else {
        alert("Error al agregar puntos")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  const handleCreateBracket = async (bracketData) => {
    try {
      const response = await fetch(`${API_BASE}/api/circuit/bracket`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bracketData, categoria, temporada }),
      })

      if (response.ok) {
        alert("Cuadro creado correctamente")
        setShowCreateBracketModal(false)
        loadBrackets() // Recargar la lista de cuadros
      } else {
        alert("Error al crear cuadro")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  const handleDeleteBracket = async (bracketId) => {
    if (!confirm("¿Estás seguro de eliminar este cuadro? Esta acción no se puede deshacer.")) return

    try {
      console.log("[v0] Eliminando cuadro:", bracketId)
      const response = await fetch(`${API_BASE}/api/circuit/bracket/${bracketId}`, {
        method: "DELETE",
        credentials: "include",
      })

      console.log("[v0] Respuesta DELETE:", response.status)

      if (response.ok) {
        alert("Cuadro eliminado correctamente")
        loadBrackets()
      } else {
        const errorData = await response.text()
        console.error("[v0] Error al eliminar:", errorData)
        alert(`Error al eliminar cuadro: ${response.status}`)
      }
    } catch (err) {
      console.error("[v0] Error de red:", err)
      alert("Error de conexión al eliminar cuadro")
    }
  }

  const handleUpdateMatch = async (bracketId, matchIndex, ganador, resultado) => {
    try {
      const response = await fetch(`${API_BASE}/api/circuit/bracket/${bracketId}/match`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchIndex, ganador, resultado }),
      })

      if (response.ok) {
        alert("Resultado actualizado correctamente")
        loadBrackets()
      } else {
        alert("Error al actualizar resultado")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Error de conexión")
    }
  }

  return (
    <div className="space-y-6">
      {/* Selector de categoría */}
      <div className="flex justify-between items-center">
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {categorias
            .reduce((grupos, cat) => {
              if (!grupos.find((g) => g.grupo === cat.grupo)) {
                grupos.push({ grupo: cat.grupo, categorias: [] })
              }
              grupos.find((g) => g.grupo === cat.grupo).categorias.push(cat)
              return grupos
            }, [])
            .map((grupo) => (
              <optgroup key={grupo.grupo} label={grupo.grupo}>
                {grupo.categorias.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
      </div>

      {/* Pestañas de vistas */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("ranking")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === "ranking" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Ranking
        </button>
        <button
          onClick={() => setView("tournaments")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === "tournaments" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Torneos
        </button>
        <button
          onClick={() => setView("brackets")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === "brackets" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Cuadros
        </button>
      </div>

      {/* Vista Ranking */}
      {view === "ranking" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Ranking - {categorias.find((c) => c.key === categoria)?.label}</h3>
            <button
              onClick={() => setShowAddPlayerModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + Agregar Puntos
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
            </div>
          ) : ranking.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600">No hay jugadores en el ranking</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Jugador</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Puntos</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Torneos</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((jugador, index) => (
                    <tr key={jugador._id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        <span
                          className={`
                            ${index === 0 ? "text-yellow-500" : ""}
                            ${index === 1 ? "text-gray-400" : ""}
                            ${index === 2 ? "text-amber-600" : ""}
                          `}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">{jugador.nombre}</td>
                      <td className="px-4 py-3 text-right font-semibold">{jugador.puntos}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{jugador.torneosJugados}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Vista Torneos */}
      {view === "tournaments" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Gestión de Torneos</h3>

          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
            </div>
          ) : tournaments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              No hay torneos disponibles. Ejecuta el script de seed para cargar los torneos.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Puntos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temporada
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tournaments.map((torneo) => (
                    <tr key={torneo._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{torneo.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{torneo.mes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            torneo.tipo === "grandslam"
                              ? "bg-purple-100 text-purple-800"
                              : torneo.tipo === "masters"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {torneo.tipo === "grandslam"
                            ? "Grand Slam"
                            : torneo.tipo === "masters"
                              ? "Masters"
                              : "Normal"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {torneo.puntos ? (
                          <div className="space-y-1">
                            <div>Campeón: {torneo.puntos.campeon || 0}</div>
                            <div>Finalista: {torneo.puntos.finalista || 0}</div>
                            <div>Semifinalista: {torneo.puntos.semifinalista || 0}</div>
                          </div>
                        ) : (
                          <div className="text-gray-400">Sin configurar</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{torneo.temporada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Vista Cuadros */}
      {view === "brackets" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Cuadros de Eliminación</h3>
            <button
              onClick={() => setShowCreateBracketModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + Crear Cuadro
            </button>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
              <p className="mt-4 text-gray-600">Cargando cuadros...</p>
            </div>
          ) : brackets.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              No hay cuadros creados para esta categoría. Crea tu primer cuadro seleccionando un torneo.
            </div>
          ) : (
            <div className="space-y-4">
              {brackets.map((bracket) => {
                const torneo =
                  tournaments.find((t) => t._id === bracket.torneoId) ||
                  (bracket.torneoId && typeof bracket.torneoId === "object" ? bracket.torneoId : null)
                return (
                  <BracketDetail
                    key={bracket._id}
                    bracket={bracket}
                    torneo={torneo}
                    onDelete={handleDeleteBracket}
                    onUpdateMatch={handleUpdateMatch}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal Agregar Puntos */}
      {showAddPlayerModal && (
        <AddPlayerModal
          categoria={categoria}
          tournaments={tournaments}
          onClose={() => setShowAddPlayerModal(false)}
          onSubmit={handleAddPoints}
        />
      )}

      {/* Modal Crear Cuadro */}
      {showCreateBracketModal && (
        <CreateBracketModal
          categoria={categoria}
          tournaments={tournaments}
          onClose={() => setShowCreateBracketModal(false)}
          onSubmit={handleCreateBracket}
        />
      )}
    </div>
  )
}

function BracketDetail({ bracket, torneo, onDelete, onUpdateMatch }) {
  const [editingMatch, setEditingMatch] = useState(null)
  const [matchResult, setMatchResult] = useState({ ganador: "", resultado: "" })
  const [viewMode, setViewMode] = useState("tree")

  const [showZoneMatchModal, setShowZoneMatchModal] = useState(false)
  const [zoneMatchData, setZoneMatchData] = useState({
    jugador1: "",
    jugador2: "",
    zona: 1,
    setsJugador1: "",
    setsJugador2: "",
    gamesJugador1: "",
    gamesJugador2: "",
  })
  const [tablasPosiciones, setTablasPosiciones] = useState(null)

  useEffect(() => {
    if (bracket.tipo === "zona_unica" || bracket.tipo === "dos_zonas") {
      loadTablasPosiciones()
    }
  }, [bracket._id, bracket.tipo])

  const loadTablasPosiciones = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/circuit/bracket/${bracket._id}/tablas`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setTablasPosiciones(data)
      }
    } catch (error) {
      console.error("Error al cargar tablas:", error)
    }
  }

  const handleCreateZoneMatch = async () => {
    if (!zoneMatchData.jugador1 || !zoneMatchData.jugador2) {
      alert("Debes seleccionar ambos jugadores")
      return
    }
    if (zoneMatchData.jugador1 === zoneMatchData.jugador2) {
      alert("Debes seleccionar dos jugadores diferentes")
      return
    }
    if (!zoneMatchData.setsJugador1 || !zoneMatchData.setsJugador2) {
      alert("Debes ingresar los sets de ambos jugadores")
      return
    }
    if (!zoneMatchData.gamesJugador1 || !zoneMatchData.gamesJugador2) {
      alert("Debes ingresar los games de ambos jugadores")
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/circuit/bracket/${bracket._id}/zone-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(zoneMatchData),
      })

      if (response.ok) {
        alert("Partido cargado exitosamente")
        setShowZoneMatchModal(false)
        setZoneMatchData({
          jugador1: "",
          jugador2: "",
          zona: 1,
          setsJugador1: "",
          setsJugador2: "",
          gamesJugador1: "",
          gamesJugador2: "",
        })
        loadTablasPosiciones()
        window.location.reload()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error al cargar partido:", error)
      alert("Error al cargar el partido")
    }
  }

  const handleDeleteZoneMatch = async (matchId) => {
    if (!confirm("¿Eliminar este partido?")) return

    try {
      const response = await fetch(`${API_BASE}/api/circuit/bracket/${bracket._id}/zone-match/${matchId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        alert("Partido eliminado")
        loadTablasPosiciones()
        window.location.reload()
      }
    } catch (error) {
      console.error("Error al eliminar partido:", error)
    }
  }

  const handleEditMatch = (matchIndex, partido) => {
    setEditingMatch(matchIndex)
    setMatchResult({
      ganador: partido.ganador || "",
      resultado: partido.resultado || "",
    })
  }

  const handleSaveMatch = (bracketId, matchIndex) => {
    if (!matchResult.ganador) {
      alert("Debes seleccionar un ganador")
      return
    }
    onUpdateMatch(bracketId, matchIndex, matchResult.ganador, matchResult.resultado)
    setEditingMatch(null)
    setMatchResult({ ganador: "", resultado: "" })
  }

  const handleCancelEdit = () => {
    setEditingMatch(null)
    setMatchResult({ ganador: "", resultado: "" })
  }

  const ganadorActual =
    zoneMatchData.setsJugador1 && zoneMatchData.setsJugador2
      ? Number(zoneMatchData.setsJugador1) > Number(zoneMatchData.setsJugador2)
        ? zoneMatchData.jugador1
        : zoneMatchData.jugador2
      : null

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-900">{torneo?.nombre || "Torneo desconocido"}</h4>
          <p className="text-sm text-gray-500">
            {bracket.tipo === "eliminacion_directa" && "Eliminación Directa"}
            {bracket.tipo === "zona_unica" && "Zona Única (Todos contra todos)"}
            {bracket.tipo === "dos_zonas" && "Dos Zonas + Final"}
            {" - "}
            {bracket.jugadores.length} jugadores
            {bracket.campeon && <span className="ml-2 text-green-600 font-medium">🏆 Campeón: {bracket.campeon}</span>}
          </p>
        </div>
        <div className="flex gap-2">
          {bracket.tipo === "eliminacion_directa" && (
            <button
              onClick={() => setViewMode(viewMode === "tree" ? "list" : "tree")}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {viewMode === "tree" ? "Vista Lista" : "Vista Árbol"}
            </button>
          )}
          <button
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => onDelete(bracket._id)}
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="p-4">
        {bracket.tipo === "zona_unica" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold text-gray-900">Zona Única - Todos contra Todos</h5>
              <button
                onClick={() => setShowZoneMatchModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                + Cargar Partido
              </button>
            </div>

            {tablasPosiciones?.zona1 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h6 className="font-medium mb-3">Tabla de Posiciones</h6>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left">Pos</th>
                        <th className="px-3 py-2 text-left">Jugador</th>
                        <th className="px-3 py-2 text-center">Pts</th>
                        <th className="px-3 py-2 text-center">PJ</th>
                        <th className="px-3 py-2 text-center">PG</th>
                        <th className="px-3 py-2 text-center">PP</th>
                        <th className="px-3 py-2 text-center">SF</th>
                        <th className="px-3 py-2 text-center">SC</th>
                        <th className="px-3 py-2 text-center">DS</th>
                        <th className="px-3 py-2 text-center">GF</th>
                        <th className="px-3 py-2 text-center">GC</th>
                        <th className="px-3 py-2 text-center">DG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tablasPosiciones.zona1.map((jugador, idx) => (
                        <tr key={idx} className={idx < 2 ? "bg-green-50 font-medium" : ""}>
                          <td className="px-3 py-2">{idx + 1}</td>
                          <td className="px-3 py-2">{jugador.jugador}</td>
                          <td className="px-3 py-2 text-center">{jugador.pts}</td>
                          <td className="px-3 py-2 text-center">{jugador.pj}</td>
                          <td className="px-3 py-2 text-center">{jugador.pg}</td>
                          <td className="px-3 py-2 text-center">{jugador.pp}</td>
                          <td className="px-3 py-2 text-center">{jugador.sf}</td>
                          <td className="px-3 py-2 text-center">{jugador.sc}</td>
                          <td className="px-3 py-2 text-center">{jugador.ds}</td>
                          <td className="px-3 py-2 text-center">{jugador.gf}</td>
                          <td className="px-3 py-2 text-center">{jugador.gc}</td>
                          <td className="px-3 py-2 text-center">{jugador.dg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">Los 2 primeros clasifican a la final</p>
              </div>
            )}

            {bracket.partidosZona && bracket.partidosZona.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h6 className="font-medium mb-3">Partidos Jugados</h6>
                <div className="space-y-2">
                  {bracket.partidosZona.map((partido) => (
                    <div key={partido._id} className="bg-white p-3 rounded border flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">
                          {partido.jugador1} vs {partido.jugador2}
                        </p>
                        <p className="text-xs text-gray-600">
                          Sets: {partido.setsJugador1} - {partido.setsJugador2} | Games: {partido.gamesJugador1} -{" "}
                          {partido.gamesJugador2}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteZoneMatch(partido._id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {bracket.tipo === "dos_zonas" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-semibold text-gray-900">Dos Zonas + Final</h5>
              <button
                onClick={() => setShowZoneMatchModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                + Cargar Partido
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Zona 1 */}
              {tablasPosiciones?.zona1 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-medium mb-3">Zona 1</h6>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-2 py-1 text-left">Pos</th>
                          <th className="px-2 py-1 text-left">Jugador</th>
                          <th className="px-2 py-1 text-center">Pts</th>
                          <th className="px-2 py-1 text-center">DS</th>
                          <th className="px-2 py-1 text-center">DG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tablasPosiciones.zona1.map((jugador, idx) => (
                          <tr key={idx} className={idx === 0 ? "bg-green-50 font-medium" : ""}>
                            <td className="px-2 py-1">{idx + 1}</td>
                            <td className="px-2 py-1">{jugador.jugador}</td>
                            <td className="px-2 py-1 text-center">{jugador.pts}</td>
                            <td className="px-2 py-1 text-center">{jugador.ds}</td>
                            <td className="px-2 py-1 text-center">{jugador.dg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">El 1° clasifica a la final</p>
                </div>
              )}

              {/* Zona 2 */}
              {tablasPosiciones?.zona2 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-medium mb-3">Zona 2</h6>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-2 py-1 text-left">Pos</th>
                          <th className="px-2 py-1 text-left">Jugador</th>
                          <th className="px-2 py-1 text-center">Pts</th>
                          <th className="px-2 py-1 text-center">DS</th>
                          <th className="px-2 py-1 text-center">DG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tablasPosiciones.zona2.map((jugador, idx) => (
                          <tr key={idx} className={idx === 0 ? "bg-green-50 font-medium" : ""}>
                            <td className="px-2 py-1">{idx + 1}</td>
                            <td className="px-2 py-1">{jugador.jugador}</td>
                            <td className="px-2 py-1 text-center">{jugador.pts}</td>
                            <td className="px-2 py-1 text-center">{jugador.ds}</td>
                            <td className="px-2 py-1 text-center">{jugador.dg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">El 1° clasifica a la final</p>
                </div>
              )}
            </div>

            {bracket.partidosZona && bracket.partidosZona.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h6 className="font-medium mb-3">Partidos Jugados</h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Zona 1</p>
                    <div className="space-y-2">
                      {bracket.partidosZona
                        .filter((p) => p.zona === 1)
                        .map((partido) => (
                          <div
                            key={partido._id}
                            className="bg-white p-2 rounded border flex justify-between items-center"
                          >
                            <div>
                              <p className="text-xs font-medium">
                                {partido.jugador1} vs {partido.jugador2}
                              </p>
                              <p className="text-xs text-gray-600">
                                {partido.setsJugador1}-{partido.setsJugador2} ({partido.gamesJugador1}-
                                {partido.gamesJugador2})
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteZoneMatch(partido._id)}
                              className="text-red-600 hover:text-red-700 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Zona 2</p>
                    <div className="space-y-2">
                      {bracket.partidosZona
                        .filter((p) => p.zona === 2)
                        .map((partido) => (
                          <div
                            key={partido._id}
                            className="bg-white p-2 rounded border flex justify-between items-center"
                          >
                            <div>
                              <p className="text-xs font-medium">
                                {partido.jugador1} vs {partido.jugador2}
                              </p>
                              <p className="text-xs text-gray-600">
                                {partido.setsJugador1}-{partido.setsJugador2} ({partido.gamesJugador1}-
                                {partido.gamesJugador2})
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteZoneMatch(partido._id)}
                              className="text-red-600 hover:text-red-700 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {bracket.tipo === "eliminacion_directa" && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Cabezas de serie:</strong> {bracket.cabezasSerie?.join(", ") || "N/A"}
            </p>

            {viewMode === "tree" ? (
              // Vista de árbol (solo lectura)
              <div className="bg-gray-50 rounded-lg p-4">
                <BracketTree partidos={bracket.partidos} />
              </div>
            ) : (
              // Vista de lista (con edición)
              <div className="bg-gray-50 rounded p-3">
                <p className="text-sm font-medium mb-3">Partidos por Ronda (Editable):</p>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {/* Agrupar partidos por ronda */}
                  {Object.entries(
                    bracket.partidos?.reduce((acc, partido, idx) => {
                      const ronda = partido.ronda || "primera_ronda"
                      if (!acc[ronda]) acc[ronda] = []
                      acc[ronda].push({ ...partido, index: idx })
                      return acc
                    }, {}) || {},
                  ).map(([ronda, partidos]) => (
                    <div key={ronda} className="border-l-4 border-green-500 pl-3">
                      <h5 className="font-medium text-gray-900 mb-2 capitalize">{ronda.replace(/_/g, " ")}</h5>
                      <div className="space-y-2">
                        {partidos.map((partido) => (
                          <div
                            key={partido.index}
                            className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow"
                          >
                            {editingMatch === partido.index ? (
                              // Modo edición
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    {partido.jugador1} vs {partido.jugador2}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <select
                                    value={matchResult.ganador}
                                    onChange={(e) => setMatchResult({ ...matchResult, ganador: e.target.value })}
                                    className="flex-1 px-3 py-1 border rounded text-sm"
                                  >
                                    <option value="">Seleccionar ganador...</option>
                                    {partido.jugador1 !== "BYE" && (
                                      <option value={partido.jugador1}>{partido.jugador1}</option>
                                    )}
                                    {partido.jugador2 !== "BYE" && (
                                      <option value={partido.jugador2}>{partido.jugador2}</option>
                                    )}
                                  </select>
                                  <input
                                    type="text"
                                    value={matchResult.resultado}
                                    onChange={(e) => setMatchResult({ ...matchResult, resultado: e.target.value })}
                                    placeholder="Ej: 6-4, 6-3"
                                    className="flex-1 px-3 py-1 border rounded text-sm"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveMatch(bracket._id, partido.index)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
                                  >
                                    Guardar
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // Modo visualización
                              <div className="flex justify-between items-center">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700 font-medium">
                                    {partido.jugador1} vs {partido.jugador2}
                                  </p>
                                  {partido.ganador && (
                                    <div className="mt-1 flex gap-2 items-center">
                                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                                        Ganador: {partido.ganador}
                                      </span>
                                      {partido.resultado && (
                                        <span className="text-xs text-gray-600">{partido.resultado}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleEditMatch(partido.index, partido)}
                                  className="ml-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium"
                                >
                                  {partido.ganador ? "Editar" : "Cargar resultado"}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {bracket.tipo === "zona_unica" && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Jugadores:</strong> {bracket.jugadores.join(", ")}
            </p>
            <p className="text-xs text-gray-500 mt-2">Sistema: Todos contra todos</p>
          </div>
        )}

        {bracket.tipo === "dos_zonas" && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Jugadores:</strong> {bracket.jugadores.join(", ")}
            </p>
            <p className="text-xs text-gray-500 mt-2">Sistema: Dos zonas con final entre ganadores</p>
          </div>
        )}
      </div>

      {showZoneMatchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Cargar Partido de Zona</h3>
            <div className="space-y-3">
              {bracket.tipo === "dos_zonas" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
                  <select
                    value={zoneMatchData.zona}
                    onChange={(e) => setZoneMatchData({ ...zoneMatchData, zona: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value={1}>Zona 1</option>
                    <option value={2}>Zona 2</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jugador 1</label>
                <select
                  value={zoneMatchData.jugador1}
                  onChange={(e) => setZoneMatchData({ ...zoneMatchData, jugador1: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  {bracket.jugadores.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jugador 2</label>
                <select
                  value={zoneMatchData.jugador2}
                  onChange={(e) => setZoneMatchData({ ...zoneMatchData, jugador2: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  {bracket.jugadores.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sets {zoneMatchData.jugador1 || "J1"}
                  </label>
                  <input
                    type="number"
                    value={zoneMatchData.setsJugador1}
                    onChange={(e) => setZoneMatchData({ ...zoneMatchData, setsJugador1: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sets {zoneMatchData.jugador2 || "J2"}
                  </label>
                  <input
                    type="number"
                    value={zoneMatchData.setsJugador2}
                    onChange={(e) => setZoneMatchData({ ...zoneMatchData, setsJugador2: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Games {zoneMatchData.jugador1 || "J1"}
                  </label>
                  <input
                    type="number"
                    value={zoneMatchData.gamesJugador1}
                    onChange={(e) => setZoneMatchData({ ...zoneMatchData, gamesJugador1: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Games {zoneMatchData.jugador2 || "J2"}
                  </label>
                  <input
                    type="number"
                    value={zoneMatchData.gamesJugador2}
                    onChange={(e) => setZoneMatchData({ ...zoneMatchData, gamesJugador2: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              {ganadorActual && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">Ganador:</span> {ganadorActual}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateZoneMatch}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowZoneMatchModal(false)
                  setZoneMatchData({
                    jugador1: "",
                    jugador2: "",
                    zona: 1,
                    setsJugador1: "",
                    setsJugador2: "",
                    gamesJugador1: "",
                    gamesJugador2: "",
                  })
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AddPlayerModal({ categoria, tournaments, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: "",
    puntos: 0,
    torneo: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">Agregar Puntos a Jugador</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Jugador</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Puntos</label>
            <input
              type="number"
              value={formData.puntos}
              onChange={(e) => setFormData({ ...formData, puntos: Number.parseInt(e.target.value) })}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="1000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Campeón: 1000 pts | Finalista: 650 pts | Semi: 400 pts | Cuartos: 200 pts
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Torneo</label>
            <input
              type="text"
              value={formData.torneo}
              onChange={(e) => setFormData({ ...formData, torneo: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Australia Open"
            />
          </div>

          <div className="flex gap-3 pt-4">
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
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CreateBracketModal({ categoria, tournaments, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    torneoId: "",
    jugadores: "",
  })
  const [playersFromRanking, setPlayersFromRanking] = useState([])

  useEffect(() => {
    loadPlayers()
  }, [categoria])

  const loadPlayers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/circuit/players/${categoria}?temporada=2025`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setPlayersFromRanking(data)
      }
    } catch (err) {
      console.error("Error al cargar jugadores:", err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const jugadoresArray = formData.jugadores
      .split("\n")
      .map((j) => j.trim())
      .filter((j) => j.length > 0)

    onSubmit({
      torneoId: formData.torneoId,
      jugadores: jugadoresArray,
    })
  }

  const handleUseRanking = () => {
    const jugadoresText = playersFromRanking.map((p) => p.nombre).join("\n")
    setFormData({ ...formData, jugadores: jugadoresText })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">Crear Cuadro de Eliminación</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Torneo</label>
            <select
              value={formData.torneoId}
              onChange={(e) => setFormData({ ...formData, torneoId: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Seleccionar torneo...</option>
              {tournaments.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.nombre} - {t.mes}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Jugadores (uno por línea, ordenados por ranking)
              </label>
              <button
                type="button"
                onClick={handleUseRanking}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Usar ranking actual
              </button>
            </div>
            <textarea
              value={formData.jugadores}
              onChange={(e) => setFormData({ ...formData, jugadores: e.target.value })}
              required
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-mono text-sm"
              placeholder="Juan Pérez&#10;Carlos García&#10;Martín López&#10;..."
            />
            <p className="text-xs text-gray-500 mt-1">
              El sistema generará automáticamente:
              <br />• 4-5 jugadores: Zona única (todos contra todos)
              <br />• 6-7 jugadores: Dos zonas + final
              <br />• 8+ jugadores: Eliminación directa (primeros 8 como cabezas de serie)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
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
              Crear Cuadro
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
