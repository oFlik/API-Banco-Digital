const { encontrarContaPorId } = require("../apoiadores/encontrarcontas");
const { contas } = require("../dados/bancodedados");
const erros = require("../dados/erros");

const verificarBodyDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: erros.conta });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: erros.valor });
    }

    const conta = encontrarContaPorId(numero_conta, contas);
    if (!conta) {
        return res.status(404).json({ mensagem: erros.contaNaoEncontrada });
    }

    next();
};

const verificarBodySaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: erros.conta });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: erros.valor });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: erros.senha });
    }

    const conta = encontrarContaPorId(numero_conta, contas);
    if (!conta) {
        return res.status(404).json({ mensagem: erros.contaNaoEncontrada });
    }

    if (senha != conta.usuario.senha) {
        return res.status(403).json({ mensagem: erros.senhaIncorreta });
    }

    next();
};

const verificarBodyTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: erros.contaOrigem });
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: erros.contaDestino });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: erros.valor });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: erros.senha });
    }

    const contaDeOrigem = encontrarContaPorId(numero_conta_origem, contas);
    if (!contaDeOrigem) {
        return res.status(404).json({ mensagem: erros.contaOrigemNaoEncontrada });
    }

    const contaDestino = encontrarContaPorId(numero_conta_destino, contas);
    if (!contaDestino) {
        return res.status(404).json({ mensagem: erros.contaDestinoNaoEncontrada });
    }

    if (senha != contaDeOrigem.usuario.senha) {
        return res.status(403).json({ mensagem: erros.senhaIncorreta });
    }

    next();
};

const verificarSaldoEExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: erros.conta });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: erros.senha });
    }

    const conta = encontrarContaPorId(numero_conta, contas);
    if (!conta) {
        return res.status(404).json({ mensagem: erros.contaNaoEncontrada });
    }

    if (senha != conta.usuario.senha) {
        return res.status(403).json({ mensagem: erros.senhaIncorreta });
    }

    next();
};

module.exports = {
    verificarBodyDeposito,
    verificarBodySaque,
    verificarBodyTransferencia,
    verificarSaldoEExtrato,
};
