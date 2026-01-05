export default function BracketTree({ partidos }) {
  if (!partidos || partidos.length === 0) {
    return <div className="text-gray-500 text-center p-4">No hay partidos disponibles</div>
  }

  // Agrupar partidos por ronda
  const partidosPorRonda = partidos.reduce((acc, partido, idx) => {
    const ronda = partido.ronda || "primera_ronda"
    if (!acc[ronda]) acc[ronda] = []
    acc[ronda].push({ ...partido, index: idx })
    return acc
  }, {})

  // Orden de rondas para visualización
  const ordenRondas = ["dieciseisavos_de_final", "octavos_de_final", "cuartos_de_final", "semifinales", "final"]

  const rondasDisponibles = ordenRondas.filter((ronda) => partidosPorRonda[ronda])

  const getNombreRonda = (ronda) => {
    const nombres = {
      dieciseisavos_de_final: "16vos",
      octavos_de_final: "8vos",
      cuartos_de_final: "4tos",
      semifinales: "Semis",
      final: "Final",
    }
    return nombres[ronda] || ronda
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-8 p-4 min-w-max">
        {rondasDisponibles.map((ronda, rondaIdx) => (
          <div key={ronda} className="flex flex-col justify-around min-w-[200px]">
            {/* Título de la ronda */}
            <div className="text-center font-bold text-gray-700 mb-4 sticky top-0 bg-white z-10 py-2">
              {getNombreRonda(ronda)}
            </div>

            {/* Partidos de la ronda */}
            <div className="flex flex-col justify-around gap-4 flex-1">
              {partidosPorRonda[ronda].map((partido) => (
                <div
                  key={partido.index}
                  className="bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow p-3"
                >
                  {/* Jugador 1 */}
                  <div
                    className={`flex justify-between items-center p-2 rounded ${
                      partido.ganador === partido.jugador1 ? "bg-green-50 font-bold" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={`text-sm ${partido.jugador1 === "BYE" ? "text-gray-400 italic" : "text-gray-900"}`}
                    >
                      {partido.jugador1 || "TBD"}
                    </span>
                    {partido.ganador === partido.jugador1 && <span className="text-green-600 ml-2">✓</span>}
                  </div>

                  <div className="my-1 text-center text-xs text-gray-400">vs</div>

                  {/* Jugador 2 */}
                  <div
                    className={`flex justify-between items-center p-2 rounded ${
                      partido.ganador === partido.jugador2 ? "bg-green-50 font-bold" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={`text-sm ${partido.jugador2 === "BYE" ? "text-gray-400 italic" : "text-gray-900"}`}
                    >
                      {partido.jugador2 || "TBD"}
                    </span>
                    {partido.ganador === partido.jugador2 && <span className="text-green-600 ml-2">✓</span>}
                  </div>

                  {/* Resultado */}
                  {partido.resultado && (
                    <div className="mt-2 text-center text-xs text-gray-600 font-medium">{partido.resultado}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
