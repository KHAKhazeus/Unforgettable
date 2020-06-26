const Router = require('koa-router');
const router = new Router();

const user = require('./service/user');
const type = require('./service/type');
const todo = require('./service/todo');

module.exports = function (app){
    app.use(router.routes()).use(router.allowedMethods());
    router.use('/auth',user.routes(),user.allowedMethods());
    router.use('/api/type',type.routes(),type.allowedMethods());
    router.use('/api/todo',todo.routes(),todo.allowedMethods());

};
