"use client"

// Torneos.jsx
import { useState, useEffect } from "react"
import { CalendarDays, Trophy, Users, ExternalLink } from "lucide-react"
import BracketTree from "./BracketTree" // Importar el nuevo componente BracketTree

// Datos de ejemplo - después se cargan desde Supabase
const categorias = {
  caballeros_singles: [
    { nombre: "Single Primera", key: "single_primera" },
    { nombre: "Single Intermedia", key: "single_intermedia" },
    { nombre: "Single Segunda", key: "single_segunda" },
    { nombre: "Single Tercera", key: "single_tercera" },
    { nombre: "Single Cuarta", key: "single_cuarta" },
    { nombre: "Single +50", key: "single_+50" },
  ],
  caballeros_dobles: [
    { nombre: "Dobles Primera", key: "dobles_primera" },
    { nombre: "Dobles Intermedia", key: "dobles_intermedia" },
    { nombre: "Dobles Segunda", key: "dobles_segunda" },
  ],
  damas_singles: [
    { nombre: "Single Primera", key: "damas_single_primera" },
    { nombre: "Single Segunda", key: "damas_single_segunda" },
    { nombre: "Single Tercera", key: "damas_single_tercera" },
  ],
  damas_dobles: [
    { nombre: "Dobles Primera", key: "damas_dobles_primera" },
    { nombre: "Dobles Intermedia", key: "damas_dobles_intermedia" },
    { nombre: "Dobles Segunda", key: "damas_dobles_segunda" },
  ],
  mixto: [
    { nombre: "Doble Mixto Primera", key: "mixto_primera" },
    { nombre: "Doble Mixto Segunda", key: "mixto_segunda" },
  ],
}

export default function LigaVeranoInvierno() {
  const [tabCuadros, setTabCuadros] = useState("torneo-3")
  const [tabRanking, setTabRanking] = useState("caballeros_singles")
  const [tournaments, setTournaments] = useState([])
  const [brackets, setBrackets] = useState({})
  const [rankings, setRankings] = useState({})
  const [loading, setLoading] = useState(true)
  const [mesSeleccionado, setMesSeleccionado] = useState("Enero")
  const [torneoSeleccionado, setTorneoSeleccionado] = useState(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

  const API_BASE = "http://localhost:4000"

  useEffect(() => {
    loadTournaments()
  }, [])

  const loadTournaments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/circuit/tournaments?temporada=2025`)
      const data = await res.json()
      setTournaments(data)

      if (data.length > 0) {
        const meses = [...new Set(data.map((t) => t.mes))]
        setMesSeleccionado(meses[0])

        const torneosDelMes = data.filter((t) => t.mes === meses[0])
        if (torneosDelMes.length > 0) {
          setTorneoSeleccionado(torneosDelMes[0]._id)
        }
      }
    } catch (error) {
      console.error("Error al cargar torneos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (torneoSeleccionado) {
      loadBrackets(torneoSeleccionado)
    }
  }, [torneoSeleccionado])

  const loadBrackets = async (torneoId) => {
    try {
      const res = await fetch(`${API_BASE}/api/circuit/brackets/${torneoId}`)
      const data = await res.json()
      setBrackets((prev) => ({ ...prev, [torneoId]: data }))

      if (data.length > 0 && !categoriaSeleccionada) {
        setCategoriaSeleccionada(data[0].categoria)
      }
    } catch (error) {
      console.error("Error al cargar cuadros:", error)
    }
  }

  useEffect(() => {
    loadRanking(tabRanking)
  }, [tabRanking])

  const loadRanking = async (categoria) => {
    try {
      const res = await fetch(`${API_BASE}/api/circuit/ranking/${categoria}?temporada=2025`)
      const data = await res.json()
      setRankings((prev) => ({ ...prev, [categoria]: data }))
    } catch (error) {
      console.error("Error al cargar ranking:", error)
    }
  }

  const torneoActivo = tournaments.find((t) => t.estado === "en_curso") || tournaments[0]
  const torneosFiltrados = tournaments.filter((t) => t.estado === "finalizado" || t.estado === "en_curso")

  const torneosPorMes = tournaments.reduce((acc, torneo) => {
    if (!acc[torneo.mes]) acc[torneo.mes] = []
    acc[torneo.mes].push(torneo)
    return acc
  }, {})

  const mesesDisponibles = Object.keys(torneosPorMes).sort((a, b) => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]
    return meses.indexOf(a) - meses.indexOf(b)
  })

  const torneosDelMesSeleccionado = torneosPorMes[mesSeleccionado] || []
  const torneoActual = tournaments.find((t) => t._id === torneoSeleccionado)
  const cuadrosDelTorneo = brackets[torneoSeleccionado] || []

  const categoriasDisponibles = [...new Set(cuadrosDelTorneo.map((b) => b.categoria))]
  const cuadroActual = cuadrosDelTorneo.find((b) => b.categoria === categoriaSeleccionada)

  return (
    <div className="min-h-screen bg-[#4a7c59]">
      {/* Hero */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <img src="/logopngcdp.png" alt="Circuito del Parque" className="h-48 md:h-64 mx-auto mb-6 drop-shadow-lg" />
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8">
            12 torneos anuales + Mid Master + Masters Final. Competí en todas las categorías y sumá puntos para el
            ranking.
          </p>
          {torneoActivo?.googleForms && (
            <a
              href={torneoActivo.googleForms}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#c4632a] hover:bg-[#a85220] text-white font-semibold py-3 px-6 rounded transition"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Inscribite al próximo torneo
            </a>
          )}

          <div className="flex justify-center gap-6 mt-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/elcircuitodelparque/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition group"
            >
              <div className="w-10 h-10 bg-white/10 group-hover:bg-[#E4405F] rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.059-1.28.073-1.689-.073-4.948 0-3.259.014-3.668.072-4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-sm font-medium">@elcircuitodelparque</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/54911343559489?text=Hola!%20Quiero%20info%20sobre%20el%20Circuito"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition group"
            >
              <div className="w-10 h-10 bg-white/10 group-hover:bg-[#25D366] rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="text-sm font-medium">1157287851</span>
            </a>
          </div>
        </div>
      </section>

      {/* Navegación rápida */}
      <nav className="bg-[#3d6b4a] sticky top-16 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center gap-4 md:gap-8 py-3 text-sm md:text-base">
            <li>
              <a href="#calendario" className="text-white hover:text-[#c4632a] transition flex items-center gap-1">
                <CalendarDays className="h-4 w-4" /> Calendario
              </a>
            </li>
            <li>
              <a href="#cuadros" className="text-white hover:text-[#c4632a] transition flex items-center gap-1">
                <Trophy className="h-4 w-4" /> Cuadros
              </a>
            </li>
            <li>
              <a href="#rankings" className="text-white hover:text-[#c4632a] transition flex items-center gap-1">
                <Users className="h-4 w-4" /> Rankings
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Calendario de Torneos */}
      <section id="calendario" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#2d4a35] mb-8 text-center">Calendario 2025</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tournaments.map((torneo) => (
              <div
                key={torneo._id}
                className={`
                  bg-white rounded-lg shadow-md p-4 border-2
                  ${torneo.tipo === "grandslam" ? "border-[#c4632a]" : "border-gray-200"}
                  ${torneo.tipo === "masters" ? "border-yellow-500 bg-yellow-50" : ""}
                  ${torneo.estado === "finalizado" ? "opacity-70" : ""}
                  ${torneo.estado === "en_curso" ? "ring-2 ring-green-500" : ""}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm md:text-base font-semibold text-[#2d4a35]">{torneo.nombre}</h3>
                  {torneo.tipo === "grandslam" && (
                    <span className="text-xs bg-[#c4632a] text-white px-2 py-0.5 rounded">GS</span>
                  )}
                  {torneo.tipo === "masters" && (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">M</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">{torneo.fecha}</p>
                <div className="mt-2">
                  {torneo.estado === "finalizado" && <span className="text-xs text-gray-500">Finalizado</span>}
                  {torneo.estado === "en_curso" && <span className="text-xs text-green-600 font-medium">En curso</span>}
                  {torneo.estado === "proximo" && torneo.googleForms && (
                    <a
                      href={torneo.googleForms}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#c4632a] hover:underline"
                    >
                      Inscribirse
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#c4632a] rounded"></div>
              <span>Grand Slam (puntos x2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-yellow-500 bg-yellow-50 rounded"></div>
              <span>Masters Final</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cuadros de Torneos */}
      <section id="cuadros" className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#2d4a35] mb-8 text-center">Cuadros de Torneos</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#2d4a35] mb-3">Selecciona un mes:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {mesesDisponibles.map((mes) => (
                <button
                  key={mes}
                  onClick={() => {
                    setMesSeleccionado(mes)
                    const torneosDelMes = torneosPorMes[mes]
                    if (torneosDelMes.length > 0) {
                      setTorneoSeleccionado(torneosDelMes[0]._id)
                      setCategoriaSeleccionada(null)
                    }
                  }}
                  className={`px-4 py-2 rounded transition ${
                    mesSeleccionado === mes ? "bg-[#2d4a35] text-white" : "bg-white text-[#2d4a35] hover:bg-gray-200"
                  }`}
                >
                  {mes}
                </button>
              ))}
            </div>
          </div>

          {torneosDelMesSeleccionado.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2d4a35] mb-3">Torneos de {mesSeleccionado}:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {torneosDelMesSeleccionado.map((torneo) => (
                  <button
                    key={torneo._id}
                    onClick={() => {
                      setTorneoSeleccionado(torneo._id)
                      setCategoriaSeleccionada(null)
                    }}
                    className={`px-4 py-2 rounded transition border-2 ${
                      torneoSeleccionado === torneo._id
                        ? "bg-[#2d4a35] text-white border-[#2d4a35]"
                        : `bg-white text-[#2d4a35] hover:bg-gray-50 ${
                            torneo.tipo === "grandslam"
                              ? "border-[#c4632a]"
                              : torneo.tipo === "masters"
                                ? "border-yellow-500"
                                : "border-gray-300"
                          }`
                    }`}
                  >
                    {torneo.nombre}
                    {torneo.tipo === "grandslam" && <span className="ml-2 text-xs">★</span>}
                    {torneo.tipo === "masters" && <span className="ml-2 text-xs">🏆</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {torneoActual && cuadrosDelTorneo.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2d4a35] mb-3">Categorías de {torneoActual.nombre}:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {categoriasDisponibles.map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                    className={`px-4 py-2 rounded transition ${
                      categoriaSeleccionada === categoria
                        ? "bg-[#c4632a] text-white"
                        : "bg-white text-[#2d4a35] hover:bg-gray-200"
                    }`}
                  >
                    {categoria.replace(/_/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {cuadroActual ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#2d4a35] text-white p-4">
                <h3 className="text-xl font-bold">{torneoActual.nombre}</h3>
                <p className="text-white/80">{cuadroActual.categoria.replace(/_/g, " ").toUpperCase()}</p>
              </div>

              <div className="p-6">
                {cuadroActual.tipo === "eliminacion_directa" && <BracketTree partidos={cuadroActual.partidos} />}

                {cuadroActual.tipo === "zona_unica" && (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">Jugadores:</p>
                    <ul className="list-disc list-inside">
                      {cuadroActual.jugadores.map((j, idx) => (
                        <li key={idx}>{j}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : torneoActual && cuadrosDelTorneo.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              Selecciona una categoría para ver el cuadro
            </div>
          ) : torneoActual ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              No hay cuadros disponibles para este torneo
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              Selecciona un torneo para ver sus cuadros
            </div>
          )}
        </div>
      </section>

      {/* Rankings */}
      <section id="rankings" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#2d4a35] mb-8 text-center">Rankings por Categoría 2025</h2>

          {/* Tabs de categorías */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              { key: "caballeros_singles", label: "Caballeros Singles" },
              { key: "caballeros_dobles", label: "Caballeros Dobles" },
              { key: "damas_singles", label: "Damas Singles" },
              { key: "damas_dobles", label: "Damas Dobles" },
              { key: "mixto", label: "Mixto" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setTabRanking(tab.key)}
                className={`px-4 py-2 rounded transition ${
                  tabRanking === tab.key ? "bg-[#2d4a35] text-white" : "bg-gray-200 text-[#2d4a35] hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido del ranking */}
          <div className="grid md:grid-cols-2 gap-6">
            {categorias[tabRanking]?.map((categoria) => {
              const rankingData = rankings[categoria.key] || []

              return (
                <div key={categoria.key} className="bg-white rounded-lg shadow-md overflow-hidden border">
                  <div className="bg-[#2d4a35] text-white p-4">
                    <h3 className="text-lg font-bold">{categoria.nombre}</h3>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm">#</th>
                        <th className="px-4 py-2 text-left text-sm">Jugador</th>
                        <th className="px-4 py-2 text-right text-sm">Pts</th>
                        <th className="px-4 py-2 text-right text-sm">T</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingData.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                            No hay jugadores en el ranking aún
                          </td>
                        </tr>
                      ) : (
                        rankingData.map((jugador, idx) => (
                          <tr key={jugador._id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">
                              <span
                                className={`
                                ${idx === 0 ? "text-yellow-500" : ""}
                                ${idx === 1 ? "text-gray-400" : ""}
                                ${idx === 2 ? "text-amber-600" : ""}
                              `}
                              >
                                {idx + 1}
                              </span>
                            </td>
                            <td className="px-4 py-2">{jugador.nombre}</td>
                            <td className="px-4 py-2 text-right font-semibold">{jugador.puntos}</td>
                            <td className="px-4 py-2 text-right text-gray-500">{jugador.torneosJugados}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sistema de Puntos */}
      <section className="py-16 px-4 bg-[#2d4a35] text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Sistema de Puntos</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Torneo Normal</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Campeón</span>
                  <span className="font-bold">1000 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Finalista</span>
                  <span>650 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Semifinalista</span>
                  <span>400 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Cuartos</span>
                  <span>200 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Octavos</span>
                  <span>100 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>16vos o más</span>
                  <span>50 pts</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#c4632a]/80 rounded-lg p-6 border border-[#c4632a]">
              <h3 className="text-xl font-bold mb-4">Grand Slam (x2)</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Campeón</span>
                  <span className="font-bold">2000 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Finalista</span>
                  <span>1300 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Semifinalista</span>
                  <span>800 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Cuartos</span>
                  <span>400 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>Octavos</span>
                  <span>200 pts</span>
                </li>
                <li className="flex justify-between">
                  <span>16vos o más</span>
                  <span>100 pts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
