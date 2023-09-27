const { encontrarContaPorId } = require("../apoiadores/encontrarcontas");
const dados = require("../dados/bancodedados");
const { format } = require("date-fns");
const erros = require("../dados/erros");

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (valor <= 0) {
        return res.status(403).json({ mensagem: erros.valorInvalido });
    }

    const conta = encontrarContaPorId(numero_conta, dados.contas);

    conta.saldo += valor;

    const data = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    dados.depositos.push({
        data,
        numero_conta,
        valor,
    });

    return res.status(201).send();
};

const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = encontrarContaPorId(numero_conta, dados.contas);

    if (valor <= 0) {
        return res.status(403).json({ mensagem: erros.valorInvalido });
    }

    if (conta.saldo < valor) {
        return res.status(403).json({ mensagem: erros.saldoIndisponivel });
    }

    conta.saldo -= valor;

    const data = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    dados.saques.push({
        data,
        numero_conta,
        valor,
    });

    return res.status(201).send();
};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;

    if (numero_conta_origem === numero_conta_destino) {
        return res.status(403).json({ mensagem: erros.contasIguais });
    }

    const contaDeOrigem = encontrarContaPorId(numero_conta_origem, dados.contas);
    const contaDestino = encontrarContaPorId(numero_conta_destino, dados.contas);

    if (valor <= 0) {
        return res.status(403).json({ mensagem: erros.valorInvalido });
    }

    if (contaDeOrigem.saldo < valor) {
        return res.status(403).json({ mensagem: erros.saldoIndisponivel });
    }

    contaDeOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const data = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    dados.transferencias.push({
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    });

    return res.status(201).send();
};

module.exports = {
    depositar,
    sacar,
    transferir,
};
