import express from 'express';
//imporanto as funções do controller
import { criarAgendamento, listarAgendamentos, buscarAgendamento, atualizarAgendamento} from '../controllers/agendamentoController.js';

const router = express.Router();

router.post('/', criarAgendamento);
router.get('/', listarAgendamentos);
router.get('/:id', buscarAgendamento);
router.put('/:id', atualizarAgendamento);

export default router;