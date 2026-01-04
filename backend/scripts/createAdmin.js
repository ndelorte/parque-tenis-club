import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

async function createAdmin() {
    await mongoose.connect(process.env.MONGODB_URI);

    const passwordHash = await bcrypt.hash("admin123", 10);

    await Admin.create({
        username: "ndelorte",
        passwordHash,
    });

    console.log("Admin user created");
    process.exit(0);
}   

createAdmin().catch((error) => {
    console.error("Error creating admin user:", error);
    process.exit(1);
}
);