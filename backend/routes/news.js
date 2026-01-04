import express from "express"
import News from "../models/news.js"
import { requireAdmin } from "../middlewares/requireAdmin.js"
import { uploadDisk } from "../middlewares/uploadDisk.js"

const router = express.Router()

/* TODAS */

router.get("/admin/all", requireAdmin, async (req, res) => {
  const news = await News.find().sort({ publishedAt: -1 }).limit(200)
  res.json(news)
})

/* PUBLICO  */
router.get("/", async (req, res) => {
  const news = await News.find({ isPublished: true }).sort({ publishedAt: -1 }).limit(10)
  res.json(news)
})

/* CREAR NOTICIA */
router.post("/", requireAdmin, uploadDisk.single("image"), async (req, res) => {
  try {
    const { title, body, publishedAt, isPublished } = req.body || {}

    console.log("[v0] Datos recibidos:", { title, body, hasFile: !!req.file })

    if (!title || !body) {
      return res.status(400).json({ message: "Título y cuerpo son obligatorios" })
    }

    const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null

    const created = await News.create({
      title,
      body,
      coverImageUrl,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      isPublished: typeof isPublished === "boolean" ? isPublished : true,
    })

    console.log("[v0] Noticia creada exitosamente:", created._id)
    res.status(201).json(created)
  } catch (error) {
    console.error("[v0] Error al crear noticia:", error)
    res.status(500).json({ message: "Error al crear la noticia: " + error.message })
  }
})

/* EDITAR NOTICIA */
router.put("/:id", requireAdmin, uploadDisk.single("image"), async (req, res) => {
  try {
    const { title, body, publishedAt, isPublished } = req.body

    console.log("[v0] Actualizando noticia:", req.params.id, { title, body, hasFile: !!req.file })

    if (!title || !body) {
      return res.status(400).json({ message: "Título y cuerpo son obligatorios" })
    }

    const updateData = {
      title,
      body,
      isPublished: isPublished === "true" || isPublished === true,
    }

    if (publishedAt) {
      updateData.publishedAt = new Date(publishedAt)
    }

    // Si hay una nueva imagen, actualizarla
    if (req.file) {
      updateData.coverImageUrl = `/uploads/${req.file.filename}`
    }

    const updated = await News.findByIdAndUpdate(req.params.id, updateData, { new: true })

    if (!updated) {
      return res.status(404).json({ message: "Noticia no encontrada" })
    }

    console.log("[v0] Noticia actualizada exitosamente:", updated._id)
    res.json(updated)
  } catch (error) {
    console.error("[v0] Error al actualizar noticia:", error)
    res.status(500).json({ message: "Error al actualizar la noticia: " + error.message })
  }
})

/* BORRAR NOTICIA */

router.delete("/:id", requireAdmin, async (req, res) => {
  const deleted = await News.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ message: "Noticia no encontrada" })
  res.json({ message: "Noticia eliminada correctamente" })
})

export default router
