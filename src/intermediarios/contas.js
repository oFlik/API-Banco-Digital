const { encontrarContaPorId } = require("../apoiadores/encontrarcontas");
const { banco, contas } = require("../dados/bancodedados");
const erros = require("../dados/erros");

const verificarSenhaDoBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    // Verifica se a senha foi passada como pesquisa.
    if (!senha_banco) {
        return res.status(400).json({ mensagem: erros.senhaBanco });
    }

    // Verifica se a senha passada está correta.
    if (senha_banco != banco.senha) {
        return res.status(401).json({ mensagem: erros.senhaBancoInvalida });
    }

    next();
};

const verificarDadosDeUsuario = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    // Verifica se todas as informações obrigatórias foram passadas, uma a uma.
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

    // Verifica se o numeroConta passado corresponde a uma conta real.
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
