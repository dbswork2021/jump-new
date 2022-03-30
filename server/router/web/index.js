const Router = require('koa-router');
const web = new Router();
const register = require('./register');
const login = require('./login');
const common = require('./common');
const user = require('./user');
const agent = require('./agent');
const url = require('./url');
const promotion = require('./promotion');
const stats = require('./stats');

const auth = require('../../middleware/auth');
const path = require('path');

web.post('/uploads', auth, (ctx) => {
  const fileName = path.basename(ctx.request.files.img.path);
  ctx.body = { fileName, message: '上传成功' };
});

web.use('/register', register.routes());
web.use('/login', login.routes());
web.use('/common', common.routes());
web.use('/user', auth, user.routes());
web.use('/agent', auth, agent.routes());
web.use('/url', auth, url.routes());
web.use('/promotion', auth, promotion.routes());
web.use('/stats', auth, stats.routes());

module.exports = web;
