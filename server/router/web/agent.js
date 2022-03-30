const Router = require('koa-router');
const agent = new Router();
const schema = require('../../model/web/agent');
const urlSchema = require('../../model/web/url');

agent.get('/', async (ctx) => {
  const data = await schema
    .find()
    .populate('urls', { nick: 1 })
    .sort({ _id: -1 });
  const urls = await urlSchema.find().select({ nick: 1 });
  ctx.body = {
    data,
    urls,
  };
});

agent.post('/', async (ctx) => {
  const model = await schema.create(ctx.request.body);
  ctx.body = {
    data: model,
    message: '添加成功',
  };
});

agent.put('/', async (ctx) => {
  const { _id, name, urls } = ctx.request.body;
  const model = await schema.findByIdAndUpdate(
    _id,
    {
      name,
      urls,
    },
    { new: true }
  );

  ctx.body = {
    data: model,
    message: '修改成功',
  };
});

agent.del('/', async (ctx) => {
  await schema.findByIdAndDelete(ctx.query.id);
  ctx.body = {
    message: '删除成功',
  };
});

module.exports = agent;
