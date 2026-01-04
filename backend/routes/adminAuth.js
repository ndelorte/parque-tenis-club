import express from "express"
import bcrypt from "bcrypt"
import Admin from "../models/Admin.js"

const router = express.Router()

router.post("/login", async (req, res) => {
  console.log("[v0] Login attempt:", req.body.username)

  const { username, password } = req.body

  const admin = await Admin.findOne({ username })
  if (!admin) {
    console.log("[v0] Admin not found:", username)
    return res.status(401).json({ message: "Credenciales inválidas" })
  }

  const ok = await bcrypt.compare(password, admin.passwordHash)
  if (!ok) {
    console.log("[v0] Password mismatch for:", username)
    return res.status(401).json({ message: "Credenciales inválidas" })
  }

  req.session.adminId = admin._id
  console.log("[v0] Login successful for:", username)
  res.json({ message: "Login exitoso" })
})

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logout exitoso" })
  })
})

export default router
