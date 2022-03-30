const Router = require('koa-router');
const promotion = new Router();
const schema = require('../../model/web/promotion');

promotion.get('/', async (ctx) => {
  const data = await schema.findOne();
  ctx.body = { data };
});

promotion.post('/', async (ctx) => {
  await schema.findOneAndUpdate({}, ctx.request.body, { upsert: true });
  ctx.body = {
    message: '保存成功',
  };
});

module.exports = promotion;
