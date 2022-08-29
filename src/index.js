const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const apolloServer = require('./apolloServer');

const PORT = 9999;
const app = new Koa();

app.use(cors());
app.use(bodyParser());

apolloServer
  .start()
  .then(() => {
    apolloServer.applyMiddleware({
      app,
      path: '/api/v1/graphql',
    });
  })
  .catch(() => {
    process.exit(1);
  });

app.on('error', (error, ctx) => {
  console.error('[SERVER_ERROR]', error, ctx);
});

app.listen(PORT);
