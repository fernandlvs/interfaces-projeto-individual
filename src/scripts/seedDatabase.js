import mongoose from "mongoose";
import { env } from "../config/env.js";

import Cliente from "../models/clienteModel.js";
import Funcionario from "../models/funcionarioModel.js";
import Servico from "../models/servicoModel.js";
import Agendamento from "../models/agendamentoModel.js";
import Comentario from "../models/comentarioModel.js";
import Galeria from "../models/galeriaModel.js";

async function run() {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB conectado");

        // LIMPAR BANCO
        await Cliente.deleteMany();
        await Funcionario.deleteMany();
        await Servico.deleteMany();
        await Agendamento.deleteMany();
        await Comentario.deleteMany();
        await Galeria.deleteMany();

        console.log("Banco limpo");

        // CLIENTES
        const cliente1 = await Cliente.create({
            nome: "Pedro Lira",
            telefone: "83999999999",
            email: "pedro@email.com"
        });

        const cliente2 = await Cliente.create({
            nome: "Maria Silva",
            telefone: "83988888888",
            email: "maria@email.com"
        });

        console.log("Clientes criados");

        // FUNCIONÁRIOS
        const func1 = await Funcionario.create({
            nome: "Ana",
            especialidade: "Unha em gel",
            telefone: "83977777777",
            email: "ana@gmail.com"
        });

        const func2 = await Funcionario.create({
            nome: "Juliana",
            especialidade: "Nail Art",
            telefone: "83966666666",
            email: "juliana@gmail.com"
        });

        console.log("Funcionários criados");

        // SERVIÇOS
        const servico1 = await Servico.create({
            nome: "Unha em gel",
            descricao: "Aplicação de unha em gel",
            preco: 80,
            duracaoMinutos: 90
        });

        const servico2 = await Servico.create({
            nome: "Nail Art",
            descricao: "Decoração artística nas unhas",
            preco: 50,
            duracaoMinutos: 60
        });

        console.log("Serviços criados");

        // AGENDAMENTOS
        const agendamento1 = await Agendamento.create({
            cliente: cliente1._id,
            funcionario: func1._id,
            servico: servico1._id,
            data: new Date("2026-03-15T14:00:00")
        });

        const agendamento2 = await Agendamento.create({
            cliente: cliente2._id,
            funcionario: func2._id,
            servico: servico2._id,
            data: new Date("2026-03-15T15:00:00")
        });

        console.log("Agendamentos criados");

        // TESTAR DUPLICAÇÃO DE CLIENTE
        try {
            await Cliente.create({
                nome: "Pedro Lira",
                telefone: "83999999999",
                email: "pedro@email.com"
            });

            console.log("ERRO: cliente duplicado foi criado");
        } catch (error) {
            console.log("Regra unique de cliente funcionando");
        }

        // TESTAR DUPLICAÇÃO DE FUNCIONARIO
        try {
            await Funcionario.create({
                nome: "Ana",
                especialidade: "Unha em gel",
                telefone: "83977777777",
                email: "ana@gmail.com"
            });

            console.log("ERRO: funcionario duplicado foi criado");
        } catch (error) {
            console.log("Regra unique de funcionario funcionando");
        }

        // TESTAR DUPLICAÇÃO DE SERVICO
        try {
            await Servico.create({
                nome: "Unha em gel",
                descricao: "Aplicação de unha em gel",
                preco: 80,
                duracaoMinutos: 90
            });

            console.log("ERRO: serviço duplicado foi criado");
        } catch (error) {
            console.log("Regra unique de serviço funcionando");
        }

        // TESTAR REGRA DE UNIQUE (funcionário + horário)
        try {
            await Agendamento.create({
                cliente: cliente2._id,
                funcionario: func1._id,
                servico: servico2._id,
                data: new Date("2026-03-15T14:00:00")
            });
        } catch (error) {
            console.log("Regra de conflito de horário do funcionário funcionandoo");
        }

        // TESTAR REGRA DE UNIQUE (cliente + horário)
        try {
            await Agendamento.create({
                cliente: cliente1._id, // mesmo cliente
                funcionario: func2._id, // funcionário diferente
                servico: servico2._id,
                data: new Date("2026-03-15T14:00:00") // mesmo horário
            });

            console.log("ERRO: cliente conseguiu agendar dois horários iguais");
        } catch (error) {
            console.log("Regra de conflito de horário do cliente funcionando");
        }

        // COMENTÁRIOS
        await Comentario.create({
            cliente: cliente1._id,
            servico: servico1._id,
            comentario: "Serviço excelente!",
            avaliacao: 5
        });

        await Comentario.create({
            cliente: cliente2._id,
            servico: servico2._id,
            comentario: "Adorei a decoração",
            avaliacao: 4
        });

        console.log("Comentários criados");

        // GALERIA
        await Galeria.create({
            imagemUrl: "https://i.pinimg.com/736x/a8/f1/73/a8f17392417f0cde42703f8a93162ee6.jpg",
            descricao: "Nail art rosa com glitter"
        });

        await Galeria.create({
            imagemUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
            descricao: "Unha em gel elegante"
        });

        console.log("Galeria criada");

        // TESTE DE POPULATE
        const agendamentos = await Agendamento.find()
            .populate("cliente", "nome")
            .populate("funcionario", "nome")
            .populate("servico", "nome preco");

        console.log("\nAgendamentos com populate:");
        console.log(JSON.stringify(agendamentos, null, 2));

        await mongoose.disconnect();

        console.log("\nSeed finalizado com sucesso");
    } catch (error) {
        console.error(error);
    }
}

run();