import mongoose from "mongoose";

const funcionarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    especialidade: {
      type: String
    },
    telefone: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    senha: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "funcionario"],
      default: "funcionario"
    },
    // N para N - a outra parte do relacionamento está em servicoModel.js
    servicos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servico"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Funcionario", funcionarioSchema);