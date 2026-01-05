import mongoose from "mongoose"

const tournamentSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    mes: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["normal", "grandslam", "masters"],
      default: "normal",
    },
    estado: {
      type: String,
      enum: ["proximo", "en_curso", "finalizado"],
      default: "proximo",
    },
    googleForms: {
      type: String,
      default: "",
    },
    temporada: {
      type: String,
      default: "2025",
    },
  },
  { timestamps: true },
)

export default mongoose.model("Tournament", tournamentSchema)
