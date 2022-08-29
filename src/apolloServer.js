const { ApolloServer } = require('apollo-server-koa');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
  introspection: true,
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  formatError: error => {
    console.error('[Apollo Server Error]:', error.extensions);
    return error;
  },
});
