const Router = require('koa-router');
const common = new Router();
const qqwry = require('lib-qqwry')();
const agentSchema = require('../../model/web/agent');
const statsSchema = require('../../model/web/data');

common.post('/', async (ctx) => {
  console.log(ctx.request.body);

  const agentId = ctx.request.body.id;
  ctx.assert(agentId, 400, 'no agent');
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
  console.log(qqwry.searchIP(ctx.request.body.ip));

  const ipData = qqwry.searchIP(ctx.request.body.ip);
  const city = ipData.Country;
  const area = ipData.Area;

  await statsSchema.create({
    agent: agentId,
    city,
    area,
    broser: ctx.request.body.browser,
    system: ctx.request.body.system,
  });

  ctx.body = { url };
});
module.exports = common;
