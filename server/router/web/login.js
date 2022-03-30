const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = require('../../model/web/user');
const { secret } = require('../../config');
const { assert } = require('console');
const login = Router();

login.post('/', async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = await schema.findOne({ username }).select('+password');

  ctx.assert(user, 400, '用户不存在！');
  const isValid = bcrypt.compareSync(password, user.password);
  ctx.assert(isValid, 400, '密码错误');
  const token = jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: '1d',
  });
  ctx.body = { token };
});
module.exports = login;
