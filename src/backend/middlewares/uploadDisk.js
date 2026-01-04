import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safe = '${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}';
        cb(null, safe);
    }
});

function fileFilter(req, file, cb) {
    const ok = ['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(file.mimetype);
    cb(ok ? null : new Error('Tipo de archivo no permitido'), ok);
}

export const uploadDisk = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });