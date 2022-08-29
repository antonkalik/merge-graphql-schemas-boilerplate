const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const PORT = 9999;
const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.on('error', (error, ctx) => {
  console.error('[SERVER_ERROR]', error, ctx);
});

app.listen(PORT);
