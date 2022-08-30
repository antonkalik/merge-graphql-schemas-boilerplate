const Koa = require('koa');
const http = require('http');
const { ApolloServer } = require('apollo-server-koa');
const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const { makeExecutableSchema, mergeSchemas } = require('@graphql-tools/schema');

module.exports = async function startApolloServer({ typeDefs, resolvers }) {
  const app = new Koa();
  const httpServer = http.createServer();
  const externalSchema = await loadSchema('http://localhost:9999/api/v1/graphql', {
    loaders: [new UrlLoader()],
  });

  const internalSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const schema = mergeSchemas({
    schemas: [externalSchema, internalSchema],
  });

  const server = new ApolloServer({
    introspection: true,
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/api/v1/graphql' });
  httpServer.on('request', app.callback());
  await new Promise(resolve => httpServer.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
  return { server, app };
};
