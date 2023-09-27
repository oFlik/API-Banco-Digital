// Arquivo para guardar as funções para encontrar contas baseado um alguma informação dada.

function encontrarContaPorId(numeroConta, contas) {
    const conta = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    return conta;
}

function encontrarContaPorCpf(cpf, contas) {
    const conta = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    return conta;
}

function encontrarContaPorEmail(email, contas) {
    const conta = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    return conta;
}

function encontrarPosicaoDaConta(numeroConta, contas) {
    const posicao = contas.findIndex((conta) => {
        return conta.numero === numeroConta;
    });

    return posicao;
}

module.exports = {
    encontrarContaPorId,
    encontrarContaPorCpf,
    encontrarContaPorEmail,
    encontrarPosicaoDaConta,
};
