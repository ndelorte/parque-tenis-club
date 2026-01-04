import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { sessionMiddleware } from "./config/session.js"
import adminAuthRoutes from "./routes/adminAuth.js"
import { requireAdmin } from "./middlewares/requireAdmin.js"
import newsRoutes from "./routes/news.js"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  }),
)

app.use(express.json())
app.use(sessionMiddleware)
app.use("/admin", adminAuthRoutes)
app.use("/api/news", newsRoutes)
app.use("/uploads", express.static(path.join(path.cwd(), 'uploads')));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API Parque Tenis Club funcionando" })
})

app.get("/admin/secret", requireAdmin, (req, res) => {
  res.json({ message: "Acceso concedido al área administrativa" })
})

const PORT = process.env.PORT || 4000

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Conectado a la base de datos MongoDB")

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
    process.exit(1)
  }
}

start()
