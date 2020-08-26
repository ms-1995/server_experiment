const Koa = require('koa');
// const fs = require('fs');
// const route = require('koa-route');
const static = require('koa-static');

const app = new Koa();

// const main = ctx => {
//   ctx.type = 'text/html';
//   ctx.body = fs.createReadStream('./views/home.html');
// };

app.use(static(__dirname+'/views/vue-project'));
// app.use(route.get('/', main));

app.listen(3000);