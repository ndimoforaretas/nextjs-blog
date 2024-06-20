import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imgpub: String,
  },
  { timestamps: true }
);

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
