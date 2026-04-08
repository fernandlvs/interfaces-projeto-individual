import express from 'express';

import { criarAgendamento, listarAgendamentos, buscarAgendamento, atualizarAgendamento, deletarAgendamento,
listarAgendamentoDoDia } from '../controllers/agendamentoController.js';

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//router.use(verificarToken);

router.post('/', criarAgendamento);
router.get('/', listarAgendamentos);
router.get('/dia/hoje', listarAgendamentoDoDia);
router.get('/:id', buscarAgendamento);
router.put('/:id', atualizarAgendamento);
router.delete('/:id', deletarAgendamento);

export default router;