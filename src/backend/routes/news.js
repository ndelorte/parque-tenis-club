import express from 'express';
import News from '../models/news.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import fs from 'fs';
import path from 'path';
import { uploadDisk } from '../middlewares/uploadDisk.js';

const router = express.Router();
/* LO QUE SE VE  */
router.get('/', async (req, res) => {
    const news = await News.find({isPublished: true}).sort({ publishedAt: -1 }).limit(10);
    res.json(news);
});

/* CREAR NOTICIA */
router.post('/', requireAdmin,uploadDisk.single("image"), async (req, res) => {
    const {title, body, publishedAt, isPublished} = req.body || {};

    if (!title || !body) {
        return res.status(400).json({ message: 'Título y cuerpo son obligatorios' });
    }

    const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const created = await News.create({
        title,
        body,
        coverImageUrl,
        publishedAt: publishedAt? new Date(publishedAt) : new Date(),
        isPublished: typeof isPublished === 'boolean' ? isPublished : true,
    }); 

    res.status(201).json(created);
});

/* EDITAR NOTICIA */

router.put('/:id', requireAdmin, async (req, res) => {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Noticia no encontrada' });
    res.json(updated);
});

/* BORRAR NOTICIA */

router.delete('/:id', requireAdmin, async (req, res) => {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Noticia no encontrada' });
    res.json({ message: 'Noticia eliminada correctamente' });
});

export default router;
