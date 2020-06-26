const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const checkToken = require('./middleware/check-token');
const routes = require('./routes');
const static = require('koa-static');
const app = new Koa();
app.use(cors({
  origin: '*'
}));
app.use(bodyParser());
app.use(checkToken())
app.use(static('./public'));
routes(app);
app.listen(3000);

