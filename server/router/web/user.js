const Router = require('koa-router');
const user = new Router();
const schema = require('../../model/web/user');

user.get('/', (ctx, next) => {
  ctx.body = { ...ctx.state.user };
});

user.put('/', async (ctx) => {
  const { id, username, password } = ctx.request.body;

  const model = await schema.findByIdAndUpdate(
    id,
    {
      username,
      password,
    },
    {
      new: true,
    }
  );

  ctx.body = { data: model, message: '修改成功, 请重新登录' };
});

module.exports = user;
