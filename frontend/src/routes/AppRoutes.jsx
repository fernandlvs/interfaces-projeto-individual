import { Routes, Route } from "react-router-dom";
import AgendamentoList from "../pages/Agendamento/AgendamentoList";
import ClienteList from "../pages/Cliente/ClienteList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/agendamentos" element={<AgendamentoList />} />
      <Route path="/admin/clientes" element={<ClienteList />} />
    </Routes>
  );
}

export default AppRoutes;
