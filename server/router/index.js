const Router = require('koa-router');
const router = new Router();
const webRouter = require('./web');

router.use('/web', webRouter.routes());

module.exports = router;
