import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    coverImageUrl: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true},
}, { timestamps: true });

export default mongoose.model("News", newsSchema);