const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = async (ctx, next) => {
  if (ctx.request.method !== 'POST' && ctx.request.url !== '/web/stats') {
    const token = String(ctx.request.header.authorization || '').replace(
      'Bearer ',
      ''
    );

    ctx.assert(token, 401, '请先登录');

    try {
      ctx.state.user = jwt.verify(token, secret);
    } catch (error) {
      ctx.assert(false, 401, '登录过期，请重新登录！');
    }

    ctx.assert(ctx.state.user, 401, '请先登录');
  }
  await next();
};
