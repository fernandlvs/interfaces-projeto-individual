import express from 'express';
//imporanto as funções do controller
import { criarAgendamento, listarAgendamentos, buscarAgendamento} from '../controllers/agendamentoController.js';

const router = express.Router();

router.post('/', criarAgendamento);
router.get('/', listarAgendamentos);
router.get('/:id', buscarAgendamento);

export default router;