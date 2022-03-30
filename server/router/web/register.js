const Router = require('koa-router');
const register = new Router();
const { code, secret } = require('../../config');
const jwt = require('jsonwebtoken');
const schema = require('../../model/web/user');

register.post('/', async (ctx) => {
  const { username, password, safeCode } = ctx.request.body;
  ctx.assert(safeCode == code, 401, '安全码错误！');
  const oldUser = await schema.findOne({ username });
  ctx.assert(!oldUser, 400, '用户已存在！');
  const user = await schema.create({
    username,
    password,
  });

  const token = jwt.sign({ id: user._id, username }, secret, {
    expiresIn: '1d',
  });
  ctx.body = { token };
});

module.exports = register;
