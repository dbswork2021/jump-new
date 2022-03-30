const Router = require('koa-router');
const stats = new Router();
const schema = require('../../model/web/data');

stats.get('/', async (ctx) => {
  const test = await schema.find();
  const dataArr = await schema
    .find({
      createTime: {
        $gt: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)).getTime(),
      },
    })
    .populate('agent', 'name');

  const agentList = dataArr.map(
    (element) => element.agent.name + '-' + element.agent._id
  );
  let data = agentList.reduce((pre, cur) => {
    if (cur in pre) {
      pre[cur]++;
    } else {
      pre[cur] = 1;
    }
    return pre;
  }, {});

  ctx.body = data;
});

stats.post('/', async (ctx) => {});

stats.put('/', async (ctx) => {
  let searchModel = {};

  if (ctx.request.body.createTime) {
    searchModel.createTime = {
      $gt: new Date(
        new Date(ctx.request.body.createTime).setHours(0, 0, 0, 0)
      ).getTime(),
      $lt: new Date(
        new Date(ctx.request.body.createTime).setHours(23, 59, 59, 999)
      ).getTime(),
    };
  } else {
    searchModel.createTime = {
      $gt: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      $lt: new Date(new Date().setHours(23, 59, 59, 999)).getTime(),
    };
  }
  if (ctx.request.body.id) {
    searchModel.agent = ctx.request.body.id;
  }
  const tableData = await schema.find(searchModel).populate('agent', 'name');
  const cityList = tableData.map((element) => element.city);
  let chartsData = cityList.reduce((pre, cur) => {
    if (cur in pre) {
      pre[cur]++;
    } else {
      pre[cur] = 1;
    }
    return pre;
  }, {});

  ctx.body = { tableData, chartsData };
});

module.exports = stats;
