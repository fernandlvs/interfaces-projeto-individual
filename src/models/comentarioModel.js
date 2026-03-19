import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    // 1 para N - comentario guarda o id do cliente
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: [true, "Cliente é obrigatório"],
    },
    // 1 para N - comentario guarda o id do serviço
    servico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servico",
    },
    comentario: {
      type: String,
      required: [true, "Texto do comentário é obrigatório"],
      trim: true,
      maxlength: [500, "Comentário deve ter no máximo 500 caracteres"],
    },
    avaliacao: {
      type: Number,
      required: [true, "Avaliação é obrigatória"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" },
  },
);

export default mongoose.model("Comentario", comentarioSchema);