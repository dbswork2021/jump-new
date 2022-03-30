const Router = require('koa-router');
const common = new Router();
const qqwry = require('lib-qqwry')();
const setSchema = require('../../model/web/promotion');
const agentSchema = require('../../model/web/agent');
const statsSchema = require('../../model/web/data');
const { jumpUrl } = require('../../config');

common.put('/', async (ctx) => {
  const agent = await agentSchema
    .findById(ctx.request.body.id)
    .select({ name: 1 });
  const sets = await setSchema.findOne();

  const strData = {
    id: agent._id,
    date: sets.delTime,
  };
  const str = Buffer.from(JSON.stringify(strData)).toString('base64');
  const url = jumpUrl + '/#/' + str;

  const dateArr = new Date().toLocaleDateString().split('/');

  const data = {
    text: agent.name,
    date: dateArr[0] + '-' + dateArr[1],
    url,
  };
  ctx.body = { sets, data };
});

common.post('/', async (ctx) => {
  let data;
  try {
    data = JSON.parse(Buffer.from(ctx.request.body.id, 'base64').toString());
  } catch (error) {
    ctx.assert(false, 400, 'no data');
  }
  ctx.assert(data, 400, 'no data');
  const agentId = data.id;
  ctx.assert(agentId, 400, 'no agent');
  const delDate = data.date;
  ctx.assert(delDate, 400, 'no time');
  const currentTime = new Date().getTime();
  ctx.assert(currentTime < delDate, 400, 'Fuck U');
  const agent = await agentSchema.findById(agentId).populate('urls', 'url');
  ctx.assert(agent, 400, 'no agent');

  const urls = agent.urls.map((item) => item.url);
  ctx.assert(urls, 400, 'no agent');
  let url = '';
  if (agent.currentUrl + 1 < urls.length) {
    url = urls[agent.currentUrl + 1];

    await agentSchema.findByIdAndUpdate(agent._id, { $inc: { currentUrl: 1 } });
  } else {
    url = urls[0];
    await agentSchema.findByIdAndUpdate(agent._id, { currentUrl: 0 });
  }
  ctx.assert(url, 400, 'no agent');
  const city = qqwry.searchIP(ctx.request.body.ip).Country;

  const model = await statsSchema.create({
    agent: agentId,
    city,
    broser: ctx.request.body.browser,
    system: ctx.request.body.system,
  });

  ctx.body = { url };
});
module.exports = common;
