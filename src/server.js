const Koa = require('koa');
const http = require('http');
const { ApolloServer: Server } = require('apollo-server-koa');
const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const { makeExecutableSchema, mergeSchemas } = require('@graphql-tools/schema');

module.exports = async function server({ typeDefs, resolvers }) {
  const app = new Koa();
  const httpServer = http.createServer();

  const internalSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const schemas = [internalSchema];

  try {
    const externalSchema = await loadSchema('http://localhost:9999/api/v1/graphql', {
      loaders: [new UrlLoader()],
    });
    schemas.push(externalSchema);
  } catch {
    console.warn('⚠️️ External Schema has not been loaded');
  }

  const server = new Server({
    introspection: true,
    schema: mergeSchemas({
      schemas,
    }),
  });

  await server.start();
  server.applyMiddleware({ app, path: '/api/v1/graphql' });
  httpServer.on('request', app.callback());
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);

  return { server, app };
};
