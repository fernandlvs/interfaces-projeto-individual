import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import AgendamentoList from "../pages/Agendamento/AgendamentoList";
import ClienteList from "../pages/Cliente/ClienteList";
=======
import Login from "../pages/Auth/Login";
import AgendamentoList from "../pages/Agendamento/AgendamentoList";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
>>>>>>> leticia

function AppRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/admin/agendamentos" element={<AgendamentoList />} />
      <Route path="/admin/clientes" element={<ClienteList />} />
=======
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/agendamentos"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AgendamentoList />
            </AdminLayout>
          </PrivateRoute>
        }
      />
>>>>>>> leticia
    </Routes>
  );
}

<<<<<<< HEAD
export default AppRoutes;
=======
export default AppRoutes;
>>>>>>> leticia
