import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

async function reset() {
  await mongoose.connect(process.env.MONGODB_URI);

  const username = "ndelorte"; // 👈 tu usuario
  const newPassword = "admin123"; // 👈 poné la que quieras

  const passwordHash = await bcrypt.hash(newPassword, 10);

  const admin = await Admin.findOneAndUpdate(
    { username },
    { passwordHash },
    { new: true }
  );

  if (!admin) {
    console.log("❌ No existe el admin");
  } else {
    console.log("✅ Password reseteada para:", username);
  }

  process.exit(0);
}

reset();
