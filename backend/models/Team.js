import mongoose from "mongoose"

const teamSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    categoria: {
      type: String,
      required: true,
      enum: ["caballeros_a", "caballeros_b", "damas_a", "damas_b", "mixto_a", "mixto_b"],
    },
    plantel: [{ type: String }],
    pts: { type: Number, default: 0 },
    pj: { type: Number, default: 0 },
    pg: { type: Number, default: 0 },
    pp: { type: Number, default: 0 },
    np: { type: Number, default: 0 },
    sf: { type: Number, default: 0 },
    sc: { type: Number, default: 0 },
    gf: { type: Number, default: 0 },
    gc: { type: Number, default: 0 },
    temporada: { type: String, required: true }, // "verano-2025" o "invierno-2025"
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Team", teamSchema)
