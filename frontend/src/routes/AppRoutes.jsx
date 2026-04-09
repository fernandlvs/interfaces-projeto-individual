import { Routes, Route } from 'react-router-dom'
import AgendamentoList from '../pages/Agendamento/AgendamentoList'
import FuncionarioList from '../pages/Funcionario/FuncionarioList'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/agendamentos" element={<AgendamentoList />} />
      <Route path="/admin/funcionarios" element={<FuncionarioList />} />
    </Routes>
  )
}

export default AppRoutes