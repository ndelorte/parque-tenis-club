import express from "express"
import Team from "../models/Team.js"
import Match from "../models/Match.js"
import { requireAdmin } from "../middlewares/requireAdmin.js"

const router = express.Router()

// Obtener equipos por categoria y temporada
router.get("/teams/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params
    const temporada = req.query.temporada || "verano-2025"
    console.log("[v0] Backend - Buscando equipos - categoria:", categoria, "temporada:", temporada)

    const teams = await Team.find({ categoria, temporada }).sort({ pts: -1, sf: -1, sc: 1, gf: -1, gc: 1 })
    console.log("[v0] Backend - Equipos encontrados:", teams.length)
    res.json(teams)
  } catch (error) {
    console.error("Error al obtener equipos:", error)
    res.status(500).json({ error: "Error al obtener equipos" })
  }
})

// Obtener fixtures por categoria y temporada
router.get("/matches/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params
    const temporada = req.query.temporada || "verano-2025"
    console.log("[v0] Backend - Buscando partidos - categoria:", categoria, "temporada:", temporada)

    const instanciaOrder = {
      "Fecha 1": 1,
      "Fecha 2": 2,
      "Fecha 3": 3,
      "Fecha 4": 4,
      "Fecha 5": 5,
      "Fecha 6": 6,
      "Fecha 7": 7,
      "Fecha 8": 8,
      CUARTOS: 100,
      SEMI: 101,
      FINAL: 102,
    }

    const matches = await Match.find({ categoria, temporada }).populate("equipoLocal equipoVisitante")

    // Ordenar por instancia y luego por fecha
    matches.sort((a, b) => {
      const orderA = instanciaOrder[a.instancia] || 999
      const orderB = instanciaOrder[b.instancia] || 999
      if (orderA !== orderB) return orderA - orderB
      return new Date(a.fecha) - new Date(b.fecha)
    })

    console.log("[v0] Backend - Partidos encontrados:", matches.length)
    res.json(matches)
  } catch (error) {
    console.error("Error al obtener partidos:", error)
    res.status(500).json({ error: "Error al obtener partidos" })
  }
})

// Crear equipo (admin)
router.post("/teams", requireAdmin, async (req, res) => {
  try {
    const team = new Team(req.body)
    await team.save()
    res.status(201).json(team)
  } catch (error) {
    console.error("Error al crear equipo:", error)
    res.status(500).json({ error: "Error al crear equipo" })
  }
})

// Crear partido (admin)
router.post("/matches", requireAdmin, async (req, res) => {
  try {
    const match = new Match(req.body)
    await match.save()
    res.status(201).json(match)
  } catch (error) {
    console.error("Error al crear partido:", error)
    res.status(500).json({ error: "Error al crear partido" })
  }
})

// Actualizar resultado de partido
router.put("/matches/:id/result", requireAdmin, async (req, res) => {
  try {
    console.log("[v0] Backend - Actualizando resultado partido:", req.params.id)
    console.log("[v0] Backend - Datos recibidos:", req.body)

    const { id } = req.params
    const {
      detalleResultado,
      resultadoSerieLocal,
      resultadoSerieVisitante,
      setsLocal,
      setsVisitante,
      gamesLocal,
      gamesVisitante,
    } = req.body

    const match = await Match.findById(id).populate("equipoLocal equipoVisitante")
    if (!match) {
      console.log("[v0] Backend - Partido no encontrado")
      return res.status(404).json({ error: "Partido no encontrado" })
    }

    console.log(
      "[v0] Backend - Partido encontrado:",
      match.instancia,
      match.equipoLocal?.nombre,
      "vs",
      match.equipoVisitante?.nombre,
    )

    const yaJugado = match.jugado
    const oldResultadoSerieLocal = match.resultadoSerieLocal || 0
    const oldResultadoSerieVisitante = match.resultadoSerieVisitante || 0
    const oldSetsLocal = match.setsLocal || 0
    const oldSetsVisitante = match.setsVisitante || 0
    const oldGamesLocal = match.gamesLocal || 0
    const oldGamesVisitante = match.gamesVisitante || 0

    // Si se proporciona detalle de resultado (ej: "63 64"), calcular automáticamente
    let calcSetsLocal = setsLocal
    let calcSetsVisitante = setsVisitante
    let calcGamesLocal = gamesLocal
    let calcGamesVisitante = gamesVisitante

    if (detalleResultado && !setsLocal) {
      // Parsear resultado tipo "63 64" o "64 36 76"
      const sets = detalleResultado.trim().split(/\s+/)
      calcSetsLocal = 0
      calcSetsVisitante = 0
      calcGamesLocal = 0
      calcGamesVisitante = 0

      sets.forEach((set) => {
        if (set.length >= 2) {
          const g1 = Number.parseInt(set[0])
          const g2 = Number.parseInt(set[1])
          calcGamesLocal += g1
          calcGamesVisitante += g2
          if (g1 > g2) calcSetsLocal++
          else calcSetsVisitante++
        }
      })
    }

    // Actualizar partido
    match.jugado = true
    match.resultadoSerieLocal = resultadoSerieLocal || calcSetsLocal
    match.resultadoSerieVisitante = resultadoSerieVisitante || calcSetsVisitante
    match.setsLocal = calcSetsLocal
    match.setsVisitante = calcSetsVisitante
    match.gamesLocal = calcGamesLocal
    match.gamesVisitante = calcGamesVisitante
    match.detalleResultado = detalleResultado
    await match.save()

    console.log("[v0] Backend - Partido actualizado correctamente")

    if (match.equipoLocal && match.equipoVisitante) {
      const equipoLocal = match.equipoLocal
      const equipoVisitante = match.equipoVisitante

      if (yaJugado) {
        console.log("[v0] Backend - Revirtiendo estadísticas anteriores")
        // Calcular puntos anteriores
        let oldPtsLocal = 0
        let oldPtsVisitante = 0
        if (oldResultadoSerieLocal > oldResultadoSerieVisitante) {
          oldPtsLocal = 2
          oldPtsVisitante = 1
        } else if (oldResultadoSerieVisitante > oldResultadoSerieLocal) {
          oldPtsVisitante = 2
          oldPtsLocal = 1
        }

        // Revertir equipo local
        equipoLocal.pj -= 1
        equipoLocal.pts -= oldPtsLocal
        if (oldPtsLocal === 2) equipoLocal.pg -= 1
        else if (oldPtsLocal === 1) equipoLocal.pp -= 1
        else equipoLocal.np -= 1
        equipoLocal.sf -= oldSetsLocal
        equipoLocal.sc -= oldSetsVisitante
        equipoLocal.gf -= oldGamesLocal
        equipoLocal.gc -= oldGamesVisitante

        // Revertir equipo visitante
        equipoVisitante.pj -= 1
        equipoVisitante.pts -= oldPtsVisitante
        if (oldPtsVisitante === 2) equipoVisitante.pg -= 1
        else if (oldPtsVisitante === 1) equipoVisitante.pp -= 1
        else equipoVisitante.np -= 1
        equipoVisitante.sf -= oldSetsVisitante
        equipoVisitante.sc -= oldSetsLocal
        equipoVisitante.gf -= oldGamesVisitante
        equipoVisitante.gc -= oldGamesLocal
      }

      // Determinar puntos basados en resultado de serie (2 ganada, 1 perdida, 0 no presentarse)
      let ptsLocal = 0
      let ptsVisitante = 0

      const serieLocal = match.resultadoSerieLocal
      const serieVisitante = match.resultadoSerieVisitante

      if (serieLocal > serieVisitante) {
        ptsLocal = 2 // Ganó
        ptsVisitante = 1 // Perdió
      } else if (serieVisitante > serieLocal) {
        ptsVisitante = 2
        ptsLocal = 1
      }

      console.log("[v0] Backend - Aplicando nuevas estadísticas")

      // Aplicar nuevas estadísticas equipo local
      equipoLocal.pj += 1
      equipoLocal.pts += ptsLocal
      if (ptsLocal === 2) equipoLocal.pg += 1
      else if (ptsLocal === 1) equipoLocal.pp += 1
      else equipoLocal.np += 1
      equipoLocal.sf += calcSetsLocal
      equipoLocal.sc += calcSetsVisitante
      equipoLocal.gf += calcGamesLocal
      equipoLocal.gc += calcGamesVisitante
      await equipoLocal.save()

      // Aplicar nuevas estadísticas equipo visitante
      equipoVisitante.pj += 1
      equipoVisitante.pts += ptsVisitante
      if (ptsVisitante === 2) equipoVisitante.pg += 1
      else if (ptsVisitante === 1) equipoVisitante.pp += 1
      else equipoVisitante.np += 1
      equipoVisitante.sf += calcSetsVisitante
      equipoVisitante.sc += calcSetsLocal
      equipoVisitante.gf += calcGamesVisitante
      equipoVisitante.gc += calcGamesLocal
      await equipoVisitante.save()

      console.log("[v0] Backend - Estadísticas de equipos actualizadas")
    }

    res.json({ match, message: "Resultado actualizado correctamente" })
  } catch (error) {
    console.error("[v0] Backend - Error al actualizar resultado:", error)
    res.status(500).json({ error: error.message || "Error al actualizar resultado" })
  }
})

// Obtener tabla de posiciones ordenada
router.get("/standings/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params
    const temporada = req.query.temporada || "verano-2025"

    const teams = await Team.find({ categoria, temporada }).sort({
      pts: -1, // Primero por puntos
      sf: -1, // Luego por sets a favor
      sc: 1, // Sets en contra (ascendente)
      gf: -1, // Games a favor
      gc: 1, // Games en contra (ascendente)
    })

    // Calcular diferencias
    const standings = teams.map((team, index) => ({
      ...team.toObject(),
      posicion: index + 1,
      difSets: team.sf - team.sc,
      difGames: team.gf - team.gc,
    }))

    res.json(standings)
  } catch (error) {
    console.error("Error al obtener posiciones:", error)
    res.status(500).json({ error: "Error al obtener posiciones" })
  }
})

export default router
