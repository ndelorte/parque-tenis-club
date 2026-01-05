import express from "express"
import Player from "../models/Player.js"
import Tournament from "../models/Tournament.js"
import Bracket from "../models/Bracket.js"
import { requireAdmin } from "../middlewares/requireAdmin.js"

const router = express.Router()

// ===== JUGADORES / RANKING =====

// Obtener ranking por categoría y temporada
router.get("/ranking/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params
    const { temporada = "2025" } = req.query

    const jugadores = await Player.find({ categoria, temporada }).sort({ puntos: -1 }).lean()

    res.json(jugadores)
  } catch (error) {
    console.error("Error al obtener ranking:", error)
    res.status(500).json({ error: error.message })
  }
})

// Agregar o actualizar puntos de un jugador
router.post("/player", requireAdmin, async (req, res) => {
  try {
    const { nombre, categoria, puntos, torneo, temporada = "2025" } = req.body

    // Buscar si el jugador ya existe
    let jugador = await Player.findOne({ nombre, categoria, temporada })

    if (jugador) {
      // Actualizar jugador existente
      jugador.puntos += puntos
      jugador.torneosJugados += 1
      jugador.historialPuntos.push({
        torneo,
        puntos,
        fecha: new Date(),
      })
      await jugador.save()
    } else {
      // Crear nuevo jugador
      jugador = await Player.create({
        nombre,
        categoria,
        puntos,
        torneosJugados: 1,
        temporada,
        historialPuntos: [
          {
            torneo,
            puntos,
            fecha: new Date(),
          },
        ],
      })
    }

    res.json(jugador)
  } catch (error) {
    console.error("Error al agregar/actualizar jugador:", error)
    res.status(500).json({ error: error.message })
  }
})

// Obtener todos los jugadores de una categoría (para crear cuadros)
router.get("/players/:categoria", requireAdmin, async (req, res) => {
  try {
    const { categoria } = req.params
    const { temporada = "2025" } = req.query

    const jugadores = await Player.find({ categoria, temporada }).sort({ puntos: -1 }).select("nombre puntos").lean()

    res.json(jugadores)
  } catch (error) {
    console.error("Error al obtener jugadores:", error)
    res.status(500).json({ error: error.message })
  }
})

// ===== TORNEOS =====

// Obtener todos los torneos
router.get("/tournaments", async (req, res) => {
  try {
    const { temporada = "2025" } = req.query
    const torneos = await Tournament.find({ temporada }).sort({ createdAt: 1 }).lean()
    res.json(torneos)
  } catch (error) {
    console.error("Error al obtener torneos:", error)
    res.status(500).json({ error: error.message })
  }
})

// Crear/actualizar torneo
router.post("/tournament", requireAdmin, async (req, res) => {
  try {
    const { _id, ...tournamentData } = req.body

    if (_id) {
      const torneo = await Tournament.findByIdAndUpdate(_id, tournamentData, { new: true })
      res.json(torneo)
    } else {
      const torneo = await Tournament.create(tournamentData)
      res.json(torneo)
    }
  } catch (error) {
    console.error("Error al crear/actualizar torneo:", error)
    res.status(500).json({ error: error.message })
  }
})

// ===== CUADROS =====

// Obtener todos los cuadros de una temporada y opcionalmente por categoría
router.get("/brackets", async (req, res) => {
  try {
    const { temporada = "2025", categoria } = req.query

    const filter = { temporada }
    if (categoria) {
      filter.categoria = categoria
    }

    const brackets = await Bracket.find(filter).populate("torneoId", "nombre mes tipo").sort({ createdAt: -1 }).lean()
    res.json(brackets)
  } catch (error) {
    console.error("Error al obtener cuadros:", error)
    res.status(500).json({ error: error.message })
  }
})

// Obtener cuadros de un torneo
router.get("/brackets/:torneoId", async (req, res) => {
  try {
    const { torneoId } = req.params
    const brackets = await Bracket.find({ torneoId }).lean()
    res.json(brackets)
  } catch (error) {
    console.error("Error al obtener cuadros:", error)
    res.status(500).json({ error: error.message })
  }
})

// Crear cuadro de eliminación
router.post("/bracket", requireAdmin, async (req, res) => {
  try {
    const { torneoId, categoria, jugadores, temporada = "2025" } = req.body

    const N = jugadores.length

    let tipo
    if (N >= 8) {
      tipo = "eliminacion_directa"
    } else if (N >= 6) {
      tipo = "dos_zonas"
    } else if (N >= 4) {
      tipo = "zona_unica"
    } else {
      return res.status(400).json({ error: "Se necesitan al menos 4 jugadores para crear un cuadro" })
    }

    console.log(`[Bracket] Creando cuadro ${tipo} para ${N} jugadores`)

    const bracket = await Bracket.create({
      torneoId,
      categoria,
      tipo,
      jugadores,
      temporada,
    })

    // Generar partidos según el tipo
    if (tipo === "eliminacion_directa") {
      bracket.partidos = generateCompleteBracket(jugadores)
    } else if (tipo === "dos_zonas") {
      bracket.partidos = generateDosZonas(jugadores)
    } else if (tipo === "zona_unica") {
      bracket.partidos = generateZonaUnica(jugadores)
    }

    await bracket.save()
    res.json(bracket)
  } catch (error) {
    console.error("Error al crear cuadro:", error)
    res.status(500).json({ error: error.message })
  }
})

function generateZonaUnica(jugadores) {
  console.log(`[ZonaUnica] Generando todos contra todos con ${jugadores.length} jugadores`)

  const partidos = []
  let matchIndex = 0

  // Fase de grupos: todos contra todos
  for (let i = 0; i < jugadores.length; i++) {
    for (let j = i + 1; j < jugadores.length; j++) {
      partidos.push({
        jugador1: jugadores[i],
        jugador2: jugadores[j],
        ronda: "fase_grupos",
        roundIndex: 0,
        matchIndex: matchIndex++,
        ganador: null,
        resultado: null,
        posicion: matchIndex - 1,
        sourceA: null,
        sourceB: null,
      })
      console.log(`[ZonaUnica] Partido ${matchIndex - 1}: ${jugadores[i]} vs ${jugadores[j]}`)
    }
  }

  // Final: TBD vs TBD (se llenarán con los 2 mejores de la fase de grupos)
  partidos.push({
    jugador1: "TBD",
    jugador2: "TBD",
    ronda: "final",
    roundIndex: 1,
    matchIndex: 0,
    ganador: null,
    resultado: null,
    posicion: 0,
    sourceA: null,
    sourceB: null,
  })

  console.log(`[ZonaUnica] Cuadro generado: ${partidos.length} partidos (${partidos.length - 1} grupos + 1 final)`)

  return partidos
}

function generateDosZonas(jugadores) {
  console.log(`[DosZonas] Generando dos zonas con ${jugadores.length} jugadores`)

  const partidos = []
  let matchIndex = 0

  // Dividir jugadores en dos zonas
  // Zona A: seed 1, 4, 5, 8... (mejor rankeado + algunos)
  // Zona B: seed 2, 3, 6, 7... (segundo mejor rankeado + algunos)
  const zonaA = []
  const zonaB = []

  // Colocar seed 1 en zona A y seed 2 en zona B
  zonaA.push(jugadores[0])
  if (jugadores.length > 1) zonaB.push(jugadores[1])

  // Distribuir el resto alternando (comenzando por zona B para balancear)
  for (let i = 2; i < jugadores.length; i++) {
    if (i % 2 === 0) {
      zonaA.push(jugadores[i])
    } else {
      zonaB.push(jugadores[i])
    }
  }

  console.log(`[DosZonas] Zona A (${zonaA.length}):`, zonaA)
  console.log(`[DosZonas] Zona B (${zonaB.length}):`, zonaB)

  // Generar partidos de Zona A: todos contra todos
  for (let i = 0; i < zonaA.length; i++) {
    for (let j = i + 1; j < zonaA.length; j++) {
      partidos.push({
        jugador1: zonaA[i],
        jugador2: zonaA[j],
        ronda: "zona_a",
        roundIndex: 0,
        matchIndex: matchIndex++,
        ganador: null,
        resultado: null,
        posicion: matchIndex - 1,
        sourceA: null,
        sourceB: null,
        zona: "A",
      })
      console.log(`[DosZonas] Zona A - Partido ${matchIndex - 1}: ${zonaA[i]} vs ${zonaA[j]}`)
    }
  }

  // Generar partidos de Zona B: todos contra todos
  const zonaAPartidos = matchIndex
  for (let i = 0; i < zonaB.length; i++) {
    for (let j = i + 1; j < zonaB.length; j++) {
      partidos.push({
        jugador1: zonaB[i],
        jugador2: zonaB[j],
        ronda: "zona_b",
        roundIndex: 0,
        matchIndex: matchIndex++,
        ganador: null,
        resultado: null,
        posicion: matchIndex - 1,
        sourceA: null,
        sourceB: null,
        zona: "B",
      })
      console.log(`[DosZonas] Zona B - Partido ${matchIndex - 1}: ${zonaB[i]} vs ${zonaB[j]}`)
    }
  }

  // Final: ganador zona A vs ganador zona B (TBD hasta que se complete la fase de grupos)
  partidos.push({
    jugador1: "TBD",
    jugador2: "TBD",
    ronda: "final",
    roundIndex: 1,
    matchIndex: 0,
    ganador: null,
    resultado: null,
    posicion: 0,
    sourceA: null,
    sourceB: null,
  })

  console.log(
    `[DosZonas] Cuadro generado: ${partidos.length} partidos (${zonaAPartidos} zona A + ${matchIndex - zonaAPartidos} zona B + 1 final)`,
  )

  return partidos
}

function generateCompleteBracket(jugadores) {
  try {
    const N = jugadores.length
    const S = nextPowerOfTwo(N)
    const byes = S - N

    console.log(`[Bracket] Jugadores: ${N}, Cuadro: ${S}, BYEs: ${byes}`)
    console.log(`[Bracket] Jugadores recibidos:`, jugadores)

    if (!Array.isArray(jugadores) || jugadores.length === 0) {
      throw new Error("El array de jugadores está vacío o no es válido")
    }

    // Crear array de slots: primero todos los jugadores, luego BYEs al final
    const slots = [...jugadores]
    for (let i = 0; i < byes; i++) {
      slots.push("BYE")
    }

    // Generar orden de seeding estándar para el tamaño del cuadro
    const seedingOrder = generateStandardSeedingOrder(S)

    // Crear array final siguiendo el orden de seeding
    const orderedSlots = new Array(S)
    for (let i = 0; i < S; i++) {
      const seedPosition = seedingOrder[i] - 1 // Convertir de 1-indexed a 0-indexed
      orderedSlots[i] = slots[seedPosition]
    }

    console.log(`[Bracket] Slots ordenados con seeding estándar (${orderedSlots.length}):`, orderedSlots)

    const emparejamientos = []
    for (let i = 0; i < S / 2; i++) {
      emparejamientos.push({
        jugador1: orderedSlots[i * 2],
        jugador2: orderedSlots[i * 2 + 1],
      })
    }

    console.log(`[Bracket] Emparejamientos generados (${emparejamientos.length}):`, emparejamientos)

    const partidos = []
    let partidoIndexGlobal = 0

    // RONDA 0: S/2 partidos
    const ronda0Nombre = getRondaNombre(S)
    const numPartidosRonda0 = S / 2

    for (let i = 0; i < numPartidosRonda0; i++) {
      const { jugador1, jugador2 } = emparejamientos[i]

      // Determinar ganador automático si hay BYE
      let ganador = null
      let resultado = null
      if (jugador1 === "BYE" && jugador2 !== "BYE") {
        ganador = jugador2
        resultado = "w.o."
      } else if (jugador2 === "BYE" && jugador1 !== "BYE") {
        ganador = jugador1
        resultado = "w.o."
      }

      partidos.push({
        jugador1,
        jugador2,
        ronda: ronda0Nombre,
        roundIndex: 0,
        matchIndex: i,
        ganador,
        resultado,
        posicion: i,
        sourceA: null,
        sourceB: null,
      })

      console.log(`[Bracket] R0-M${i}: "${jugador1}" vs "${jugador2}"${ganador ? ` → ganador: ${ganador}` : ""}`)
      partidoIndexGlobal++
    }

    // RONDAS SIGUIENTES
    let matchesInPreviousRound = S / 2
    let roundIndex = 1
    let firstMatchIndexOfPreviousRound = 0

    while (matchesInPreviousRound > 1) {
      const currMatches = Math.floor(matchesInPreviousRound / 2)
      const rondaNombre = getNextRoundName(partidos[partidos.length - 1].ronda)

      for (let j = 0; j < currMatches; j++) {
        // Este partido recibe ganadores de partidos 2j y 2j+1 de la ronda anterior
        const sourceMatchIndexA = firstMatchIndexOfPreviousRound + 2 * j
        const sourceMatchIndexB = firstMatchIndexOfPreviousRound + 2 * j + 1

        const prevMatchA = partidos[sourceMatchIndexA]
        const prevMatchB = partidos[sourceMatchIndexB]

        // Jugadores iniciales basados en ganadores previos
        const jugador1 = prevMatchA.ganador || "TBD"
        const jugador2 = prevMatchB.ganador || "TBD"

        // Si ambos están definidos y hay BYE, auto-avanzar
        let ganador = null
        let resultado = null
        if (jugador1 !== "TBD" && jugador2 !== "TBD") {
          // Ambos disponibles
          if (jugador1 === "BYE" && jugador2 !== "BYE") {
            ganador = jugador2
            resultado = "w.o."
          } else if (jugador2 === "BYE" && jugador1 !== "BYE") {
            ganador = jugador1
            resultado = "w.o."
          }
        }

        partidos.push({
          jugador1,
          jugador2,
          ronda: rondaNombre,
          roundIndex,
          matchIndex: j,
          ganador,
          resultado,
          posicion: j,
          sourceA: { roundIndex: roundIndex - 1, matchIndex: 2 * j },
          sourceB: { roundIndex: roundIndex - 1, matchIndex: 2 * j + 1 },
        })

        console.log(
          `[Bracket] R${roundIndex}-M${j}: "${jugador1}" vs "${jugador2}" (sources: R${roundIndex - 1}-M${2 * j} y R${roundIndex - 1}-M${2 * j + 1})${ganador ? ` → ganador: ${ganador}` : ""}`,
        )
        partidoIndexGlobal++
      }

      firstMatchIndexOfPreviousRound += matchesInPreviousRound
      matchesInPreviousRound = currMatches
      roundIndex++
    }

    console.log(`[Bracket] Propagando ganadores automáticos...`)
    for (let i = 0; i < partidos.length; i++) {
      const partido = partidos[i]
      if (partido.ganador && partido.resultado === "w.o.") {
        console.log(
          `[Bracket] Propagando ganador automático de R${partido.roundIndex}-M${partido.matchIndex}: ${partido.ganador}`,
        )
        propagarGanadorAlPadre(partidos, partido.roundIndex, partido.matchIndex, partido.ganador)
      }
    }

    console.log(`[Bracket] Bracket completo: ${partidos.length} partidos en ${roundIndex} rondas`)

    return partidos
  } catch (error) {
    console.error("[Bracket] Error en generateCompleteBracket:", error)
    throw error
  }
}

function generateStandardSeedingOrder(size) {
  // Para cuadros de potencia de 2, generar orden estándar donde:
  // - Seed 1 en posición 1 (top)
  // - Seed 2 en posición size (bottom)
  // - Seed 3 en posición size/2 (middle top)
  // - Seed 4 en posición size/2+1 (middle bottom)
  // - El resto se distribuye recursivamente

  if (size === 1) return [1]
  if (size === 2) return [1, 2]

  // Generar recursivamente para mitad del tamaño
  const prevRound = generateStandardSeedingOrder(size / 2)
  const curr = []

  // Intercalar: cada seed de la ronda anterior se empareja con su opuesto
  for (const seed of prevRound) {
    curr.push(seed)
    curr.push(size + 1 - seed) // El opuesto en el ranking
  }

  return curr
}

// Eliminar un cuadro
router.delete("/bracket/:bracketId", requireAdmin, async (req, res) => {
  try {
    const { bracketId } = req.params
    console.log("[Backend] Eliminando cuadro:", bracketId)

    const deletedBracket = await Bracket.findByIdAndDelete(bracketId)

    if (!deletedBracket) {
      return res.status(404).json({ error: "Cuadro no encontrado" })
    }

    console.log("[Backend] Cuadro eliminado exitosamente")
    res.json({ message: "Cuadro eliminado exitosamente" })
  } catch (error) {
    console.error("[Backend] Error al eliminar cuadro:", error)
    res.status(500).json({ error: error.message })
  }
})

router.put("/bracket/:bracketId/match", requireAdmin, async (req, res) => {
  try {
    const { bracketId } = req.params
    const { matchIndex, ganador, resultado } = req.body

    console.log(`[v0] Actualizando partido ${matchIndex} con ganador: ${ganador}`)

    const bracket = await Bracket.findById(bracketId)
    if (!bracket) {
      return res.status(404).json({ error: "Cuadro no encontrado" })
    }

    // Actualizar el partido actual
    const partido = bracket.partidos[matchIndex]

    console.log(`[v0] Partido encontrado:`, {
      roundIndex: partido.roundIndex,
      matchIndex: partido.matchIndex,
      ronda: partido.ronda,
      jugador1: partido.jugador1,
      jugador2: partido.jugador2,
    })

    partido.ganador = ganador
    partido.resultado = resultado

    console.log(`[v0] Partido actualizado - R${partido.roundIndex}-M${partido.matchIndex}: ganador=${ganador}`)

    // Propagar al partido padre
    propagarGanadorAlPadre(bracket.partidos, partido.roundIndex, partido.matchIndex, ganador)

    // Verificar si es la final
    if (partido.ronda === "final") {
      bracket.campeon = ganador
      console.log(`[v0] Campeón del torneo: ${ganador}`)
    }

    bracket.markModified("partidos")
    await bracket.save()
    res.json(bracket)
  } catch (error) {
    console.error("Error al actualizar partido:", error)
    res.status(500).json({ error: error.message })
  }
})

router.put("/bracket/:bracketId/zone-match", requireAdmin, async (req, res) => {
  try {
    const { bracketId } = req.params
    const { matchIndex, setsJugador1, setsJugador2, gamesJugador1, gamesJugador2 } = req.body

    console.log(`[ZoneMatch] Actualizando partido ${matchIndex}:`, {
      setsJugador1,
      setsJugador2,
      gamesJugador1,
      gamesJugador2,
    })

    const bracket = await Bracket.findById(bracketId)
    if (!bracket) {
      return res.status(404).json({ error: "Cuadro no encontrado" })
    }

    const partido = bracket.partidos[matchIndex]
    if (!partido) {
      return res.status(404).json({ error: "Partido no encontrado" })
    }

    // Actualizar resultado del partido
    partido.setsJugador1 = setsJugador1
    partido.setsJugador2 = setsJugador2
    partido.gamesJugador1 = gamesJugador1
    partido.gamesJugador2 = gamesJugador2
    partido.jugado = true

    // Determinar ganador
    if (setsJugador1 > setsJugador2) {
      partido.ganador = partido.jugador1
      partido.resultado = `${setsJugador1}-${setsJugador2}`
    } else if (setsJugador2 > setsJugador1) {
      partido.ganador = partido.jugador2
      partido.resultado = `${setsJugador2}-${setsJugador1}`
    }

    console.log(`[ZoneMatch] Ganador: ${partido.ganador}`)

    bracket.markModified("partidos")
    await bracket.save()

    // Calcular tabla de posiciones si es zona
    if (bracket.tipo === "zona_unica" || bracket.tipo === "dos_zonas") {
      const tabla = calcularTablaPosiciones(bracket)
      res.json({ bracket, tabla })
    } else {
      res.json({ bracket })
    }
  } catch (error) {
    console.error("Error al actualizar partido de zona:", error)
    res.status(500).json({ error: error.message })
  }
})

router.get("/bracket/:bracketId/standings", async (req, res) => {
  try {
    const { bracketId } = req.params
    const bracket = await Bracket.findById(bracketId)

    if (!bracket) {
      return res.status(404).json({ error: "Cuadro no encontrado" })
    }

    if (bracket.tipo === "eliminacion_directa") {
      return res.status(400).json({ error: "Eliminación directa no tiene tabla de posiciones" })
    }

    const tabla = calcularTablaPosiciones(bracket)
    res.json(tabla)
  } catch (error) {
    console.error("Error al obtener tabla de posiciones:", error)
    res.status(500).json({ error: error.message })
  }
})

router.post("/bracket/:bracketId/update-finalists", requireAdmin, async (req, res) => {
  try {
    const { bracketId } = req.params
    const bracket = await Bracket.findById(bracketId)

    if (!bracket) {
      return res.status(404).json({ error: "Cuadro no encontrado" })
    }

    const tabla = calcularTablaPosiciones(bracket)

    // Encontrar el partido de la final
    const finalMatch = bracket.partidos.find((p) => p.ronda === "final")

    if (!finalMatch) {
      return res.status(400).json({ error: "No hay final configurada" })
    }

    if (bracket.tipo === "zona_unica") {
      // Los dos mejores de la zona única
      if (tabla.zonaUnica.length >= 2) {
        finalMatch.jugador1 = tabla.zonaUnica[0].nombre
        finalMatch.jugador2 = tabla.zonaUnica[1].nombre
        console.log(`[Finalists] Zona Única: ${finalMatch.jugador1} vs ${finalMatch.jugador2}`)
      }
    } else if (bracket.tipo === "dos_zonas") {
      // El mejor de cada zona
      if (tabla.zonaA.length >= 1 && tabla.zonaB.length >= 1) {
        finalMatch.jugador1 = tabla.zonaA[0].nombre
        finalMatch.jugador2 = tabla.zonaB[0].nombre
        console.log(`[Finalists] Dos Zonas: ${finalMatch.jugador1} (Zona A) vs ${finalMatch.jugador2} (Zona B)`)
      }
    }

    bracket.markModified("partidos")
    await bracket.save()

    res.json(bracket)
  } catch (error) {
    console.error("Error al actualizar finalistas:", error)
    res.status(500).json({ error: error.message })
  }
})

router.delete("/bracket/:bracketId/zone-match/:matchIndex", requireAdmin, async (req, res) => {
  try {
    const { bracketId, matchIndex } = req.params

    const bracket = await Bracket.findById(bracketId)
    if (!bracket) {
      return res.status(404).json({ error: "Cuadro no encontrado" })
    }

    const partido = bracket.partidos[Number.parseInt(matchIndex)]
    if (!partido) {
      return res.status(404).json({ error: "Partido no encontrado" })
    }

    // Resetear resultado
    partido.setsJugador1 = 0
    partido.setsJugador2 = 0
    partido.gamesJugador1 = 0
    partido.gamesJugador2 = 0
    partido.jugado = false
    partido.ganador = null
    partido.resultado = null

    bracket.markModified("partidos")
    await bracket.save()

    res.json(bracket)
  } catch (error) {
    console.error("Error al eliminar resultado:", error)
    res.status(500).json({ error: error.message })
  }
})

function propagarGanadorAlPadre(partidos, roundIndex, matchIndex, ganador) {
  console.log(`[Propagar] R${roundIndex}-M${matchIndex}: ganador="${ganador}"`)

  // Buscar el partido padre
  // matchIndex 0 y 1 alimentan padre 0, matchIndex 2 y 3 alimentan padre 1, etc.
  const parentRoundIndex = roundIndex + 1
  const parentMatchIndex = Math.floor(matchIndex / 2)

  // Encontrar el partido padre en el array
  const parentMatch = partidos.find((p) => p.roundIndex === parentRoundIndex && p.matchIndex === parentMatchIndex)

  if (!parentMatch) {
    console.log(`[Propagar] No hay partido padre (es la final)`)
    return
  }

  // Determinar si va como jugador1 o jugador2
  // matchIndex par (0, 2, 4, 6) → jugador1
  // matchIndex impar (1, 3, 5, 7) → jugador2
  if (matchIndex % 2 === 0) {
    parentMatch.jugador1 = ganador
    console.log(`[Propagar] → R${parentRoundIndex}-M${parentMatchIndex}: jugador1 = "${ganador}"`)
  } else {
    parentMatch.jugador2 = ganador
    console.log(`[Propagar] → R${parentRoundIndex}-M${parentMatchIndex}: jugador2 = "${ganador}"`)
  }

  // Si el partido padre ahora tiene ambos jugadores definidos, verificar auto-avance por BYE
  if (parentMatch.jugador1 !== "TBD" && parentMatch.jugador2 !== "TBD") {
    if (parentMatch.jugador1 === "BYE" && parentMatch.jugador2 !== "BYE") {
      parentMatch.ganador = parentMatch.jugador2
      parentMatch.resultado = "w.o."
      console.log(`[Propagar] → Auto-avance: "${parentMatch.jugador2}" gana por w.o.`)

      // Propagar recursivamente
      propagarGanadorAlPadre(partidos, parentRoundIndex, parentMatchIndex, parentMatch.jugador2)
    } else if (parentMatch.jugador2 === "BYE" && parentMatch.jugador1 !== "BYE") {
      parentMatch.ganador = parentMatch.jugador1
      parentMatch.resultado = "w.o."
      console.log(`[Propagar] → Auto-avance: "${parentMatch.jugador1}" gana por w.o.`)

      // Propagar recursivamente
      propagarGanadorAlPadre(partidos, parentRoundIndex, parentMatchIndex, parentMatch.jugador1)
    } else {
      console.log(`[Propagar] → Partido listo: "${parentMatch.jugador1}" vs "${parentMatch.jugador2}"`)
    }
  }
}

function getNextRoundName(currentRound) {
  const roundOrder = [
    "dieciseisavos_de_final",
    "octavos_de_final",
    "cuartos_de_final",
    "semifinales",
    "final",
    "campeon",
  ]

  const currentIndex = roundOrder.indexOf(currentRound)
  if (currentIndex === -1 || currentIndex === roundOrder.length - 1) {
    return "campeon"
  }

  return roundOrder[currentIndex + 1]
}

function getRondaNombre(size) {
  switch (size) {
    case 2:
      return "final"
    case 4:
      return "semifinales"
    case 8:
      return "cuartos_de_final"
    case 16:
      return "octavos_de_final"
    case 32:
      return "dieciseisavos_de_final"
    default:
      return "primera_ronda"
  }
}

function nextPowerOfTwo(n) {
  let p = 1
  while (p < n) p *= 2
  return p
}

function calcularTablaPosiciones(bracket) {
  console.log(`[Standings] Calculando tabla para ${bracket.tipo}`)

  if (bracket.tipo === "zona_unica") {
    // Una sola zona: todos los jugadores
    const jugadores = bracket.jugadores.map((nombre) => ({
      nombre,
      pts: 0,
      pj: 0,
      pg: 0,
      pp: 0,
      sf: 0,
      sc: 0,
      gf: 0,
      gc: 0,
    }))

    // Procesar partidos de fase de grupos
    bracket.partidos
      .filter((p) => p.ronda === "fase_grupos" && p.jugado)
      .forEach((partido) => {
        const j1 = jugadores.find((j) => j.nombre === partido.jugador1)
        const j2 = jugadores.find((j) => j.nombre === partido.jugador2)

        if (!j1 || !j2) return

        j1.pj++
        j2.pj++

        j1.sf += partido.setsJugador1
        j1.sc += partido.setsJugador2
        j1.gf += partido.gamesJugador1
        j1.gc += partido.gamesJugador2

        j2.sf += partido.setsJugador2
        j2.sc += partido.setsJugador1
        j2.gf += partido.gamesJugador2
        j2.gc += partido.gamesJugador1

        if (partido.ganador === partido.jugador1) {
          j1.pg++
          j2.pp++
          j1.pts += 2
          j2.pts += 1
        } else {
          j2.pg++
          j1.pp++
          j2.pts += 2
          j1.pts += 1
        }
      })

    // Calcular diferencias
    jugadores.forEach((j) => {
      j.difSets = j.sf - j.sc
      j.difGames = j.gf - j.gc
    })

    // Ordenar por puntos, diferencia de sets, diferencia de games
    jugadores.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts
      if (b.difSets !== a.difSets) return b.difSets - a.difSets
      return b.difGames - a.difGames
    })

    return { zonaUnica: jugadores }
  } else if (bracket.tipo === "dos_zonas") {
    // Dos zonas separadas
    const jugadoresZonaA = []
    const jugadoresZonaB = []

    // Obtener jugadores de cada zona desde los partidos
    const partidosZonaA = bracket.partidos.filter((p) => p.zona === "A")
    const partidosZonaB = bracket.partidos.filter((p) => p.zona === "B")

    // Recolectar jugadores únicos de zona A
    const jugadoresA = new Set()
    partidosZonaA.forEach((p) => {
      if (p.jugador1 && p.jugador1 !== "TBD") jugadoresA.add(p.jugador1)
      if (p.jugador2 && p.jugador2 !== "TBD") jugadoresA.add(p.jugador2)
    })

    jugadoresA.forEach((nombre) => {
      jugadoresZonaA.push({
        nombre,
        pts: 0,
        pj: 0,
        pg: 0,
        pp: 0,
        sf: 0,
        sc: 0,
        gf: 0,
        gc: 0,
      })
    })

    // Recolectar jugadores únicos de zona B
    const jugadoresB = new Set()
    partidosZonaB.forEach((p) => {
      if (p.jugador1 && p.jugador1 !== "TBD") jugadoresB.add(p.jugador1)
      if (p.jugador2 && p.jugador2 !== "TBD") jugadoresB.add(p.jugador2)
    })

    jugadoresB.forEach((nombre) => {
      jugadoresZonaB.push({
        nombre,
        pts: 0,
        pj: 0,
        pg: 0,
        pp: 0,
        sf: 0,
        sc: 0,
        gf: 0,
        gc: 0,
      })
    })

    // Procesar partidos de zona A
    partidosZonaA
      .filter((p) => p.jugado)
      .forEach((partido) => {
        const j1 = jugadoresZonaA.find((j) => j.nombre === partido.jugador1)
        const j2 = jugadoresZonaA.find((j) => j.nombre === partido.jugador2)

        if (!j1 || !j2) return

        j1.pj++
        j2.pj++

        j1.sf += partido.setsJugador1
        j1.sc += partido.setsJugador2
        j1.gf += partido.gamesJugador1
        j1.gc += partido.gamesJugador2

        j2.sf += partido.setsJugador2
        j2.sc += partido.setsJugador1
        j2.gf += partido.gamesJugador2
        j2.gc += partido.gamesJugador1

        if (partido.ganador === partido.jugador1) {
          j1.pg++
          j2.pp++
          j1.pts += 2
          j2.pts += 1
        } else {
          j2.pg++
          j1.pp++
          j2.pts += 2
          j1.pts += 1
        }
      })

    // Procesar partidos de zona B
    partidosZonaB
      .filter((p) => p.jugado)
      .forEach((partido) => {
        const j1 = jugadoresZonaB.find((j) => j.nombre === partido.jugador1)
        const j2 = jugadoresZonaB.find((j) => j.nombre === partido.jugador2)

        if (!j1 || !j2) return

        j1.pj++
        j2.pj++

        j1.sf += partido.setsJugador1
        j1.sc += partido.setsJugador2
        j1.gf += partido.gamesJugador1
        j1.gc += partido.gamesJugador2

        j2.sf += partido.setsJugador2
        j2.sc += partido.setsJugador1
        j2.gf += partido.gamesJugador2
        j2.gc += partido.gamesJugador1

        if (partido.ganador === partido.jugador1) {
          j1.pg++
          j2.pp++
          j1.pts += 2
          j2.pts += 1
        } else {
          j2.pg++
          j1.pp++
          j2.pts += 2
          j1.pts += 1
        }
      })

    // Calcular diferencias y ordenar
    const ordenarTabla = (jugadores) => {
      jugadores.forEach((j) => {
        j.difSets = j.sf - j.sc
        j.difGames = j.gf - j.gc
      })

      jugadores.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts
        if (b.difSets !== a.difSets) return b.difSets - a.difSets
        return b.difGames - a.difGames
      })
    }

    ordenarTabla(jugadoresZonaA)
    ordenarTabla(jugadoresZonaB)

    return {
      zonaA: jugadoresZonaA,
      zonaB: jugadoresZonaB,
    }
  }

  return null
}

export default router
