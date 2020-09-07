let Koa = require('koa')
let router = require('koa-router')()
let bodyParser = require('koa-bodyparser');
let DB = require('./module/mongodb/db')
const fs = require('fs');

var app = new Koa()
app.use(bodyParser());

router.get('/', async (ctx) => {
  console.time('start首页');
  console.timeEnd('start首页');
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream('./views/home.html');
})
router.get('/search', async (ctx) => {
  console.time('数据库查询');
  var result = await DB.find('user', ctx.query);
  console.timeEnd('数据库查询');
  ctx.body = result;
})
router.post('/insert', async (ctx) => {
  var result = await DB.insert({
    "name": ctx.request.body.name
  }, 'user', {});
  ctx.body = '插入成功';
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);