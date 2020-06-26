const Router = require('koa-router');
const router = new Router();

const {
  ToDo
} = require('../../db');
const Sequelize = require('sequelize');


router.get('/init', async (ctx) => {
  let userId = ctx.state.userId;
  await ToDo.findOne({
    where: {
      userId
    }
  }).then(data => {
    ctx.response.status = 200;
    ctx.response.body = data && data.content || '{}'
  }).catch(err => {
    console.error(err);
    ctx.response.status = 401;
  });
})

router.get('/flush', async (ctx) => {
  let userId = ctx.state.userId;
  let content = ctx.request.query.data;

  await ToDo.upsert({
    userId,
    content
  }).then(data => {
      ctx.response.status = 200;
      ctx.response.body = 0
  }).catch(err => {
    console.error(err);
    ctx.response.status = 400;
  });
})

router.post('/delete', async (ctx) => {
  let userId = ctx.state.userId;
  let todoId = ctx.request.body.todoId;

  await ToDo.delete({
    where: {
      id: todoId,
      userId
    }
  }).then(data => {
    if (data) {
      ctx.response.status = 200;
      ctx.response.body = {
        code: 0,
      };
    } else {
      ctx.response.status = 400;
    }
  }).catch(err => {
    console.error(err);
    ctx.response.status = 400;
  });
})

router.post('/update', async (ctx) => {
  let userId = ctx.state.userId;
  let todoId = ctx.request.body.todoId;
  let state = ctx.request.body.state;

  await ToDo.update({
    where: {
      id: todoId,
      userId
    }
  }).then(data => {
    if (data) {
      ctx.response.status = 200;
      ctx.response.body = {
        code: 0,
      };
    } else {
      ctx.response.status = 400;
    }
  }).catch(err => {
    console.error(err);
    ctx.response.status = 400;
  });
})
module.exports = router;