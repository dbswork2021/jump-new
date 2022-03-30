const Router = require('koa-router');
const url = new Router();
const schema = require('../../model/web/url');

url.get('/', async (ctx) => {
  const model = await schema.find().sort({ _id: -1 });
  ctx.body = model;
});

url.post('/', async (ctx) => {
  const model = await schema.create(ctx.request.body);
  ctx.body = {
    data: model,
    message: '添加成功',
  };
});

url.put('/', async (ctx) => {
  const { _id, nick, url } = ctx.request.body;
  const model = await schema.findByIdAndUpdate(
    _id,
    {
      nick,
      url,
    },
    { new: true }
  );

  ctx.body = {
    data: model,
    message: '修改成功',
  };
});

url.del('/', async (ctx) => {
  await schema.findByIdAndDelete(ctx.query.id);
  ctx.body = {
    message: '删除成功',
  };
});

module.exports = url;

