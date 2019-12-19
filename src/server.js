const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const resolvers = require('./resolvers/resolvers');
const { loadState } = require('./state/state');

/**
 * Função principal que inicializa o projeto
 *
 * @author Bruno Eduardo
 * @returns {Express} - App
 */
function app() {
  /**
   * Inicializa o State
   */
  function initState() {
    console.log('> Carregando o state');
    loadState();
  }
  initState();

  const schema = buildSchema(fs.readFileSync(`${__dirname}/schema.graphql`, 'utf-8').toString());

  const app = express();
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true
    })
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`\n> Server rodando, acesse http://localhost:${port}/graphql`));

  return app;
}

module.exports = app();
