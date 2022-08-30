const cors = require('@koa/cors');
const server = require('./server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

server({ typeDefs, resolvers }).then(({ app }) => {
  app.use(cors());
});
