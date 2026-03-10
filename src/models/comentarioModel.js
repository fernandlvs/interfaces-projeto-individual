import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true
    },

    comentario: {
      type: String,
      required: true
    },

    avaliacao: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comentario", comentarioSchema);