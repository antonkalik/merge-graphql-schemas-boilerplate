const cors = require('@koa/cors');
const startApolloServer = require('./apolloServer');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

startApolloServer({ typeDefs, resolvers }).then(({ app }) => {
  app.use(cors());
});
