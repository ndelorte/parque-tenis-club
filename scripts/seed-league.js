import fetch from "node-fetch"

const API_BASE = "http://localhost:4000"

// Datos de ejemplo para cargar
const equipos = {
  caballeros_a: [
    { nombre: "Equipo 1", categoria: "caballeros_a" },
    { nombre: "Equipo 2", categoria: "caballeros_a" },
    { nombre: "Equipo 3", categoria: "caballeros_a" },
    { nombre: "Equipo 4", categoria: "caballeros_a" },
  ],
  caballeros_b: [
    { nombre: "Equipo 1", categoria: "caballeros_b" },
    { nombre: "Equipo 2", categoria: "caballeros_b" },
    { nombre: "Equipo 3", categoria: "caballeros_b" },
    { nombre: "Equipo 4", categoria: "caballeros_b" },
  ],
  damas_a: [
    { nombre: "Equipo 1", categoria: "damas_a" },
    { nombre: "Equipo 2", categoria: "damas_a" },
    { nombre: "Equipo 3", categoria: "damas_a" },
    { nombre: "Equipo 4", categoria: "damas_a" },
  ],
}

async function seedLeague() {
  console.log("Iniciando carga de datos de liga...")

  // Primero crear equipos
  const equiposCreados = {}

  for (const [categoria, listaEquipos] of Object.entries(equipos)) {
    console.log(`\nCreando equipos para ${categoria}...`)
    equiposCreados[categoria] = []

    for (const equipo of listaEquipos) {
      try {
        const response = await fetch(`${API_BASE}/api/league/teams`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(equipo),
        })
        const data = await response.json()
        equiposCreados[categoria].push(data)
        console.log(`✓ Creado: ${equipo.nombre}`)
      } catch (err) {
        console.error(`✗ Error creando ${equipo.nombre}:`, err.message)
      }
    }
  }

  // Ahora crear partidos de ejemplo
  console.log("\n\nCreando partidos de ejemplo...")

  for (const [categoria, equipos] of Object.entries(equiposCreados)) {
    if (equipos.length < 2) continue

    console.log(`\nCreando partidos para ${categoria}...`)

    // Crear algunos partidos de ejemplo
    const partidos = [
      {
        equipoLocal: equipos[0]._id,
        equipoVisitante: equipos[1]._id,
        categoria,
        temporada: "verano-2025",
        fecha: "2025-01-15",
        horario: "18:00",
        instancia: "Fecha 1",
      },
      {
        equipoLocal: equipos[2]._id,
        equipoVisitante: equipos[3]._id,
        categoria,
        temporada: "verano-2025",
        fecha: "2025-01-15",
        horario: "19:30",
        instancia: "Fecha 1",
      },
      {
        equipoLocal: equipos[0]._id,
        equipoVisitante: equipos[2]._id,
        categoria,
        temporada: "verano-2025",
        fecha: "2025-01-22",
        horario: "18:00",
        instancia: "Fecha 2",
      },
    ]

    for (const partido of partidos) {
      try {
        const response = await fetch(`${API_BASE}/api/league/matches`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(partido),
        })
        await response.json()
        console.log(`✓ Creado partido: ${partido.instancia}`)
      } catch (err) {
        console.error(`✗ Error creando partido:`, err.message)
      }
    }
  }

  console.log("\n\n✅ Carga de datos completada!")
  console.log("Ahora puedes acceder al admin para cargar resultados")
}

seedLeague()
