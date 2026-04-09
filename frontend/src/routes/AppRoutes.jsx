import { Routes, Route } from 'react-router-dom'
import AgendamentoList from '../pages/Agendamento/AgendamentoList'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/agendamentos" element={<AgendamentoList />} />
    </Routes>
  );
}

export default AppRoutes;