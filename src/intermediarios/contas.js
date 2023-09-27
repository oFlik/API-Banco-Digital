const { encontrarContaPorId } = require("../apoiadores/encontrarcontas");
const { banco, contas } = require("../dados/bancodedados");
const erros = require("../dados/erros");

const verificarSenhaDoBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: erros.senhaBanco });
    }

    if (senha_banco != banco.senha) {
        return res.status(401).json({ mensagem: erros.senhaBancoInvalida });
    }

    next();
};

const verificarDadosDeUsuario = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: erros.nomeUsuario });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: erros.cpfUsuario });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: erros.dataNascimento });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: erros.telefone });
    }
    if (!email) {
        return res.status(400).json({ mensagem: erros.emailUsuario });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: erros.senhaUsuario });
    }

    next();
};

const verificarNumeroConta = (req, res, next) => {
    const { numeroConta } = req.params;

    const conta = encontrarContaPorId(numeroConta, contas);
    if (!conta) {
        return res.status(404).json({ mensagem: erros.contaNaoEncontrada });
    }

    next();
};

module.exports = {
    verificarSenhaDoBanco,
    verificarDadosDeUsuario,
    verificarNumeroConta,
};
