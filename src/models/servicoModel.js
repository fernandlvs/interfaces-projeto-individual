import mongoose from "mongoose";

const servicoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true
        },
        descricao: {
            type: String
        },
        preco: {
            type: Number,
            required: true
        },
        duracaoMinutos: {
            type: Number
        },
        // N para N - a outra parte do relacionamento está em funcionarioModel.js
        funcionarios: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Funcionario"
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Servico", servicoSchema);