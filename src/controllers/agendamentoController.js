import Agendamento from '../models/agendamentoModel.js';
import Cliente from '../models/clienteModel.js';
import Funcionario from '../models/funcionarioModel.js';
import Servico from '../models/servicoModel.js';

const criarAgendamento = async (req, res) => {
  try {
    let { cliente, funcionario, servico, data, status } = req.body;

    const agendamento = await Agendamento.create({ cliente, funcionario, servico, data, status });
    res.status(201).json({
        sucesso: true,
        mensagem: 'Agendamento criado com sucesso',
        dados: agendamento, 
    });
  } catch (error) {
    res.status(400).json({
        sucesso: false,
        mensagem: error.message,
    });
  }
};

const listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.find()
            .populate('cliente', 'nome')
            .populate('funcionario', 'nome')
            .populate('servico', 'nome')
            .sort({ data: 1 });

        res.status(200).json({
            sucesso: true,
            total: agendamentos.length, //quantos agendamentos foram encontrados
            dados: agendamentos, //a lista completa 
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false, 
            mensagem: error.message,
        });
    }

};

//bsucar um agendamento especifico pelo ID que é passado como parametro na URL
const buscarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;

    const agendamento = await Agendamento.findById(id)
    //ao inves de retornar apenas os IDs relacionados, retorna os nomes 
      .populate('cliente', 'nome') 
      .populate('funcionario', 'nome')
      .populate('servico', 'nome'); 
    
      //se o agendamento não for encontrado, retorna 404
    if (!agendamento) { 
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Agendamento não encontrado',
      });
    }
      //se encontrado, retorna os dados do agendamento
    res.status(200).json({
      sucesso: true,
      mensagem:'Agendamento encontrado',
      dados: agendamento,
    });
  } catch (error) {
      res.status(500).json({
        sucesso: false,
        mensagem: error.message,
      });
    }
}

const atualizarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, funcionario, servico, data, status } = req.body;

    const agendamento = await Agendamento.findByIdAndUpdate(
      id,
      { cliente, funcionario, servico, data, status },
      { new: true } //retorna o documento atualizado
    );

    if (!agendamento) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Agendamento não encontrado',
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Agendamento atualizado com sucesso',
      dados: agendamento,
    });

  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message,
    });
  }
}

export { criarAgendamento, listarAgendamentos, buscarAgendamento, atualizarAgendamento
 };