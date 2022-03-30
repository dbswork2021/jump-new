const Koa = require('koa');
const { port } = require('./config');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const router = require('./router');

const app = new Koa();
require('./utils/db')();
app.use(cors());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: __dirname + '/public/uploads',
      keepExtensions: true,
    },
  })
);
app.use(koaStatic(__dirname + '/public/'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
