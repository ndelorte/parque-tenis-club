import mongoose from "mongoose"

const matchSchema = new mongoose.Schema(
  {
    categoria: {
      type: String,
      required: true,
      enum: ["caballeros_a", "caballeros_b", "damas_a", "damas_b", "mixto_a", "mixto_b"],
    },
    temporada: { type: String, required: true }, // "verano-2025"
    instancia: { type: String, required: true }, // "Fecha 1", "CUARTOS", etc
    fecha: { type: String, required: true }, // "1-12-2025"
    horario: { type: String, required: true }, // "21:00"
    equipoLocal: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    equipoVisitante: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    nombreLocal: { type: String }, // Para playoffs: "1ro", "Ganador A", etc
    nombreVisitante: { type: String },

    // Resultado
    jugado: { type: Boolean, default: false },
    resultadoSerieLocal: { type: Number, default: 0 }, // Cuántos sets ganó (resultado de la serie)
    resultadoSerieVisitante: { type: Number, default: 0 },
    setsLocal: { type: Number, default: 0 }, // Sets a favor
    setsVisitante: { type: Number, default: 0 }, // Sets a favor
    gamesLocal: { type: Number, default: 0 }, // Games a favor
    gamesVisitante: { type: Number, default: 0 }, // Games a favor

    // Detalle de los sets (opcional, para mostrar 6-3 6-4)
    detalleResultado: { type: String }, // "63 64" o "2-1"
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Match", matchSchema)
