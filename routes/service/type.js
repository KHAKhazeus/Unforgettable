const Router = require('koa-router');
const router = new Router();

const {
  Type
} = require('../../db');
const Sequelize = require('sequelize');


router.get('/list', async (ctx) => {
  let userId = ctx.state.userId;
  await Type.findAll({
    where: {
      userId
    }
  }).then(types => {
    ctx.response.status = 200;
    ctx.response.body = {
      code:0,
      types
    };
  }).catch(err => {
    console.error(err);
    ctx.response.status = 401;
  });
})
router.post('/create', async (ctx) => {
  let userId = ctx.state.userId;
  let  typeContent = ctx.request.body.typeContent;

  let type = await Type.findOne({
    where: {
      userId,
      typeContent
    }
  })
  if (type) {
    ctx.response.status = 200;
    ctx.response.body = {
      code: 1000,
      message: '类型已存在'
    };
    return
  }
  await Type.create({
    userId,
    typeContent
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