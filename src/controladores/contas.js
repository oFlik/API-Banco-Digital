const {
    encontrarContaPorId,
    encontrarContaPorCpf,
    encontrarContaPorEmail,
    encontrarPosicaoDaConta,
} = require("../apoiadores/encontrarcontas");
const { contas, saques, depositos, transferencias } = require("../dados/bancodedados");
const erros = require("../dados/erros");

const listarContas = (req, res) => {
    return res.status(200).json(contas);
};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpfDuplicado = encontrarContaPorCpf(cpf, contas);
    const emailDuplicado = encontrarContaPorEmail(email, contas);

    if (cpfDuplicado || emailDuplicado) {
        return res.status(403).json({ mensagem: erros.contaDuplicada });
    }

    let numero = "1";
    const numerosExistentes = contas.map((conta) => {
        return Number(conta.numero);
    });

    if (numerosExistentes.length) {
        numero = String(
            numerosExistentes.reduce((a, b) => {
                return Math.max(a, b);
            }) + 1
        );
    }

    const novaConta = {
        numero,
        saldo: 0,
        usuario: { nome, cpf, data_nascimento, telefone, email, senha },
    };

    contas.push(novaConta);

    return res.status(201).send();
};

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    const cpfDuplicado = encontrarContaPorCpf(cpf, contas);
    if (cpfDuplicado && numeroConta != cpfDuplicado.numero) {
        return res.status(403).json({ mensagem: erros.cpfDuplicado });
    }

    const emailDuplicado = encontrarContaPorEmail(email, contas);
    if (emailDuplicado && numeroConta != emailDuplicado.numero) {
        return res.status(403).json({ mensagem: erros.emailDuplicado });
    }

    const contaAntiga = encontrarContaPorId(numeroConta, contas);

    const posicao = encontrarPosicaoDaConta(numeroConta, contas);

    const contaAtualizada = {
        numero: numeroConta,
        saldo: contaAntiga.saldo,
        usuario: { nome, cpf, data_nascimento, telefone, email, senha },
    };

    contas.splice(posicao, 1, contaAtualizada);

    return res.status(204).send();
};

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = encontrarContaPorId(numeroConta, contas);

    if (conta.saldo != 0) {
        return res.status(403).json({ mensagem: erros.saldoInvalido });
    }

    const posicao = encontrarPosicaoDaConta(numeroConta, contas);

    contas.splice(posicao, 1);

    return res.status(204).send();
};

const mostrarSaldo = (req, res) => {
    const { numero_conta } = req.query;

    const conta = encontrarContaPorId(numero_conta, contas);

    const saldo = conta.saldo;

    return res.status(200).json({ saldo: saldo });
};

const mostrarExtrato = (req, res) => {
    const { numero_conta } = req.query;

    const saquesFeitos = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    });

    const depositosFeitos = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    });

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    const resposta = {
        depositos: depositosFeitos,
        saques: saquesFeitos,
        transferenciasEnviadas,
        transferenciasRecebidas,
    };

    return res.status(200).json(resposta);
};

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    mostrarSaldo,
    mostrarExtrato,
};
