import "dotenv/config"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar variables de entorno desde backend/.env
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✓ Cargada" : "✗ No encontrada")

// Importar modelo
import Tournament from "../models/Tournament.js"

const torneos = [
  {
    nombre: "Australia Open",
    mes: "Enero",
    fecha: "01-31 Ene",
    tipo: "grandslam",
    puntos: { campeon: 2000, finalista: 1300, semifinalista: 800, cuartos: 400, octavos: 200, resto: 100 },
  },
  {
    nombre: "Argentina Open",
    mes: "Febrero",
    fecha: "01-28 Feb",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Miami Open",
    mes: "Marzo",
    fecha: "01-31 Mar",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Monte Carlo Open",
    mes: "Abril",
    fecha: "01-30 Abr",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Roland Garros",
    mes: "Mayo",
    fecha: "01-31 May",
    tipo: "grandslam",
    puntos: { campeon: 2000, finalista: 1300, semifinalista: 800, cuartos: 400, octavos: 200, resto: 100 },
  },
  {
    nombre: "Halle",
    mes: "Junio",
    fecha: "01-30 Jun",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Mid Master",
    mes: "Julio",
    fecha: "1-21 Julio",
    tipo: "masters",
    puntos: { campeon: 1500, finalista: 975, semifinalista: 600, cuartos: 300, octavos: 150, resto: 75 },
  },
  {
    nombre: "Wimbledon",
    mes: "Julio",
    fecha: "01-31 Jul",
    tipo: "grandslam",
    puntos: { campeon: 2000, finalista: 1300, semifinalista: 800, cuartos: 400, octavos: 200, resto: 100 },
  },
  {
    nombre: "Cincinnati Open",
    mes: "Agosto",
    fecha: "01-31 Ago",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Us Open",
    mes: "Septiembre",
    fecha: "01-30 Sep",
    tipo: "grandslam",
    puntos: { campeon: 2000, finalista: 1300, semifinalista: 800, cuartos: 400, octavos: 200, resto: 100 },
  },
  {
    nombre: "China Open",
    mes: "Octubre",
    fecha: "01-31 Oct",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Paris Open",
    mes: "Noviembre",
    fecha: "01-30 Nov",
    tipo: "normal",
    puntos: { campeon: 1000, finalista: 650, semifinalista: 400, cuartos: 200, octavos: 100, resto: 50 },
  },
  {
    nombre: "Final Master",
    mes: "Diciembre",
    fecha: "10-21 Dic",
    tipo: "masters",
    puntos: { campeon: 1500, finalista: 975, semifinalista: 600, cuartos: 300, octavos: 150, resto: 75 },
  },
]

async function seedTournaments() {
  try {
    console.log("Conectando a MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Conectado exitosamente")

    console.log("Limpiando torneos anteriores...")
    await Tournament.deleteMany({})

    console.log("Creando torneos...")
    for (const torneo of torneos) {
      const created = await Tournament.create({
        nombre: torneo.nombre,
        mes: torneo.mes,
        fecha: torneo.fecha,
        tipo: torneo.tipo,
        estado: "proximo",
        temporada: "2025", // Cambiar temporada de "circuito-2025" a "2025" para coincidir con el frontend
        puntos: torneo.puntos,
      })
      console.log(`✓ Torneo creado: ${created.nombre} (${created.tipo})`)
    }

    console.log("\n✓ Datos de torneos cargados exitosamente")
    process.exit(0)
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

seedTournaments()
