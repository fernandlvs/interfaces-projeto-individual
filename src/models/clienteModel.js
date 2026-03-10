import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cliente", clienteSchema);