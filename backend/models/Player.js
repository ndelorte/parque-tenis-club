import mongoose from "mongoose"

const playerSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      enum: [
        "single_primera",
        "single_intermedia",
        "single_segunda",
        "single_tercera",
        "single_cuarta",
        "single_+50",
        "dobles_primera",
        "dobles_intermedia",
        "dobles_segunda",
        "damas_single_primera",
        "damas_single_segunda",
        "damas_single_tercera",
        "damas_dobles_primera",
        "damas_dobles_intermedia",
        "damas_dobles_segunda",
        "mixto_primera",
        "mixto_segunda",
      ],
    },
    puntos: {
      type: Number,
      default: 0,
    },
    torneosJugados: {
      type: Number,
      default: 0,
    },
    temporada: {
      type: String,
      default: "2025",
    },
    historialPuntos: [
      {
        torneo: String,
        puntos: Number,
        fecha: Date,
      },
    ],
  },
  { timestamps: true },
)

// Índice compuesto para evitar jugadores duplicados en la misma categoría y temporada
playerSchema.index({ nombre: 1, categoria: 1, temporada: 1 }, { unique: true })

export default mongoose.model("Player", playerSchema)
