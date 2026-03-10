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
        }
    },
    { timestamps: true }
);

export default mongoose.model("Servico", servicoSchema);