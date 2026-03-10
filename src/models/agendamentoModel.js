import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true
    },

    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Funcionario",
      required: true
    },

    servico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servico",
      required: true
    },

    data: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["agendado", "cancelado", "concluido"],
      default: "agendado"
    }
  },
  { timestamps: true }
);

// funcionário não pode ter dois atendimentos no mesmo horário
agendamentoSchema.index(
  { funcionario: 1, data: 1 },
  { unique: true }
);

// cliente não pode ter dois agendamentos no mesmo horário
agendamentoSchema.index(
  { cliente: 1, data: 1 },
  { unique: true }
);

export default mongoose.model("Agendamento", agendamentoSchema);