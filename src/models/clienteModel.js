import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    telefone: {
      type: String,
      trim: true,
    },
    // 1 para 1 - a outra parte do relacionamento está em perfilCliente
    perfil: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PerfilCliente",
    },
  },
  {
    timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" },
  },
);

export default mongoose.model("Cliente", clienteSchema);