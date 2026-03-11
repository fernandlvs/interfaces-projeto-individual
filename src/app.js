import express from "express";
import cors from "cors";
import agendamentoRoutes from "./routes/agendamentoRoutes.js";
import servicosRoutes from "./routes/servicosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Nails Design is running");
});

app.use("/agendamento", agendamentoRoutes);
app.use("/servicos", servicosRoutes);

export default app;