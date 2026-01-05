import mongoose from "mongoose"

const matchSchema = new mongoose.Schema({
  jugador1: String,
  jugador2: String,
  ganador: String,
  resultado: String, // Para eliminación directa o resultado simple
  ronda: String, // 'final', 'semifinal', 'cuartos', 'octavos', 'fase_grupos', 'zona_a', 'zona_b'
  posicion: Number,
  roundIndex: Number,
  matchIndex: Number,
  zona: String, // 'A' o 'B' para dos zonas
  setsJugador1: { type: Number, default: 0 },
  setsJugador2: { type: Number, default: 0 },
  gamesJugador1: { type: Number, default: 0 },
  gamesJugador2: { type: Number, default: 0 },
  jugado: { type: Boolean, default: false },
})

const bracketSchema = new mongoose.Schema(
  {
    torneoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["eliminacion_directa", "zona_unica", "dos_zonas"],
      required: true,
    },
    jugadores: [String],
    cabezasSerie: [String],
    partidos: [matchSchema],
    campeon: String,
    temporada: {
      type: String,
      default: "2025",
    },
  },
  { timestamps: true },
)

export default mongoose.model("Bracket", bracketSchema)
