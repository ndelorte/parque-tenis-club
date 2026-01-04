import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API Parque Tenis Club funcionando" });
});

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a la base de datos MongoDB");

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
}

start();