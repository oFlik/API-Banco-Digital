const express = require("express");
const contas = require("./controladores/contas");
const intContas = require("./intermediarios/contas");
const intTransacoes = require("./intermediarios/transacoes");
const transacoes = require("./controladores/transacoes");

const roteador = express();

roteador.get("/contas", intContas.verificarSenhaDoBanco, contas.listarContas);
roteador.post("/contas", intContas.verificarDadosDeUsuario, contas.criarConta);
roteador.put(
    "/contas/:numeroConta/usuario",
    intContas.verificarNumeroConta,
    intContas.verificarDadosDeUsuario,
    contas.atualizarUsuario
);
roteador.delete("/contas/:numeroConta", intContas.verificarNumeroConta, contas.excluirConta);
roteador.get("/contas/saldo", intTransacoes.verificarSaldoEExtrato, contas.mostrarSaldo);
roteador.get("/contas/extrato", intTransacoes.verificarSaldoEExtrato, contas.mostrarExtrato);

roteador.post("/transacoes/depositar", intTransacoes.verificarBodyDeposito, transacoes.depositar);
roteador.post("/transacoes/sacar", intTransacoes.verificarBodySaque, transacoes.sacar);
roteador.post(
    "/transacoes/transferir",
    intTransacoes.verificarBodyTransferencia,
    transacoes.transferir
);

module.exports = {
    roteador,
};
