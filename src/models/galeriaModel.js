import mongoose from "mongoose";

const galeriaSchema = new mongoose.Schema(
  {
    imagemUrl: {
      type: String,
      required: true
    },

    descricao: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Galeria", galeriaSchema);