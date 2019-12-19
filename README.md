# Sobre

Uma POC em NodeJS para testar e aprender sobre GraphQL, usando um exemplo de sistema simples de gerenciamento de anotações.
</br>
Autor: Bruno Eduardo A. Soares `<bruno.soares@kepha.com.br>`

# Instalar e Rodar

- Clone o projeto para a sua máquina

```
cd poc-graphql/
npm install
npm start
```

# Schema

Query

- `anotacaoById`: Retorna uma Anotação pelo ID
- `allAnotacoes`: Retorna todas as Anotações
- `anotacoesAfterDate`: Retorna as Anotações que foram modificadas após uma data

Mutation

- `saveAnotacao`: Salva uma nova Anotação
- `updateAnotacao`: Atualiza uma Anotação
- `deleteAnotacaoById`: Deleta uma Anotação pelo ID

<i>Obs: para mais informações do Schema olhe o arquivo `src/schema.graphql`</i>
