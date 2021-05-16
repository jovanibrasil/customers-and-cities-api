# Avaliação Compasso UOL - desafio nodejs

## Objetivo

Implementar uma API que contemple as seguintes operações expostas como endpoints REST para:

- Cadastrar cidade
- Cadastrar cliente
- Consultar cidade pelo nome
- Consultar cidade pelo estado
- Consultar cliente pelo nome
- Consultar cliente pelo Id
- Remover cliente
- Alterar o nome do cliente

Considerando o cadastro com dados básicos:

- Cidades: nome e estado
- Cliente: nome completo, sexo, data de nascimento, idade e cidade onde mora.

## Como rodar

- subir as dependências organizadas no docker-compose com o seguinte comando: ```npm run dev-env-up```
- rodar o projeto em modo desenvolvimento com o comando ```npm start```
- localmente é possível acessar o swagger na url: http://localhost:3000/docs/
