import Agendamento from '../models/agendamentoModel.js';
import Cliente from '../models/clienteModel.js';
import Funcionario from '../models/funcionarioModel.js';
import Servico from '../models/servicoModel.js';

const criarAgendamento = async (req, res) => {
  try {
    const { cliente, funcionario, servico, data, status } = req.body;

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


const buscarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;

    const agendamento = await Agendamento.findById(id)
    //ao inves de retornar apenas os IDs relacionados, retorna os nomes 
      .populate('cliente', 'nome') 
      .populate('funcionario', 'nome')
      .populate('servico', 'nome'); 
    
      
    if (!agendamento) { 
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Agendamento não encontrado',
      });
    }
      
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
    )
      .populate('cliente', 'nome')
      .populate('funcionario', 'nome')
      .populate('servico', 'nome');

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

const deletarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await Agendamento.findByIdAndDelete(id);

    if (!agendamento) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Agendamento não encontrado',
      });
    }
    res.status(200).json({
      sucesso: true,
      mensagem: 'Agendamento deletado com sucesso',
    });

  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message,
    });
  }

}

// listar apenas os agendamento do dia atual 

const listarAgendamentoDoDia = async (req, res) => {
  try {
    const hoje = new Date();

    //cria um cópia da data atual e ajusta para o início do dia ou para o fim do dia
    const inicioDoDia = new Date(hoje);
    inicioDoDia.setHours(0, 0, 0, 0);

    const fimDoDia = new Date(hoje);
    fimDoDia.setHours(23, 59, 59, 999);

    const agendamentosDoDia = await Agendamento.find({
      data: { $gte: inicioDoDia, $lte: fimDoDia }
    })
      .populate('cliente', 'nome')
      .populate('funcionario', 'nome')
      .populate('servico', 'nome')
      .sort({ data: 1 }); //ordena por horario crescente

    res.status(200).json({
      sucesso: true,
      data: hoje.toLocaleDateString('pt-BR'), 
      total: agendamentosDoDia.length,
      dados: agendamentosDoDia,
    });

  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message,
    });
  }
}




export { criarAgendamento, listarAgendamentos, buscarAgendamento, atualizarAgendamento, deletarAgendamento, listarAgendamentoDoDia };