# API REST para um Banco Digital

### Descrição Geral
Este projeto constiste em uma API para uso em um sistema de Banco Digital. <br>
Implementada como desafio para o curso de Desenvolvimento de Software com foco em Back-End da Cubos Academy.

---
### Tecnologias utilizadas
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) <br>
![](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)<br>

---
### Funcionalidades
#### `/get/contas <br>`

Lista todas as contas armazenadas no sistema, com informações tais como:
* Número indicador da conta
* Saldo do usuário
* Informações da conta

Para acessar estas informações é necessário informar a senha do banco via query param.

```senha_banco=Cubos123Bank```

![](./imgs/listarContas.png)

#### `/post/contas`

Cria uma nova conta de usuário cujo ID é único.<br>
Conta com validações para garantir que o CPF e email do usuário é único.<br>
Para que a requisição seja completa os campos a seguir são obrigatórios:
* Nome
* CPF
* Data de Nascimento
* Telefone
* Email
* Senha

![](imgs/cadastrarConta.png)

 #### `/put/contas/:numeroConta/usuario`

