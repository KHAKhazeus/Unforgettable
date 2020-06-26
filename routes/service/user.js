const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken')

const {
  User
} = require('../../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sha1 = require('sha1');

router.post('/login', async (ctx) => {
  let username = ctx.request.body.username;
  let password = sha1(ctx.request.body.password);
  await User.findOne({
    where: {
      username,
      password
    }
  }).then(user => {
    ctx.response.status = 200;

    if (user && (password === user.password)) {
      delete user.password;
      ctx.response.body = {
        code:0,
        user: user,
        token: createToken(user.id)
      };
    } else {
      ctx.response.body = {
        code:1000,
        message:'用户名密码验证失败'
      };
    }
  }).catch(err => {
    console.error(err);
    ctx.response.status = 401;
  });
})


router.post('/register', async (ctx) => {
  let username = ctx.request.body.username;
  let password = sha1(ctx.request.body.password);
  let name = ctx.request.body.username;
  let user = await User.findOne({
    where: {
      username
    }
  })
  if (user) {
    ctx.response.status = 200;
    ctx.response.body = {
      code: 1000,
      message: '用户名已存在'
    };
    return
  }
  await User.create({
    username,
    password,
    name
  }).then(data => {
    if (data) {
      ctx.response.status = 200;
      ctx.response.body = {
        code: 0,
        token: createToken(data.id)
      };
    } else {
      ctx.response.status = 400;
    }
  }).catch(err => {
    console.error(err);
    ctx.response.status = 400;
  });
});

router.post('/checkToken', async(ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    code: 0,
    userId: ctx.state.userId
  }
});

const createToken = function (userId) {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 100);
  return jwt.sign({
    userId,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'JWT_SECRET');
};

module.exports = router;