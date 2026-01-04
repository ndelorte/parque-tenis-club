import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    req.session.adminId = admin._id;
    res.json({ message: 'Login exitoso' });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.json({ message: 'Logout exitoso' });
    });
});

export default router;