const jwt = require('jsonwebtoken');
module.exports = function () {
  return async function (ctx, next) {
    if (ctx.url != '/auth/login' && ctx.url != '/auth/register') {
      if (ctx.request.headers['authorization']) {
        let auth_attr = ctx.request.headers['authorization'].split(' ');
        if (auth_attr[0] !== 'Bearer' || auth_attr.length !== 2) {
          ctx.response.body = {
            msg: 'not authorized!'
          };
          ctx.response.status = 401;
        } else {
          let token = auth_attr[1];
          let decoded = jwt.decode(token, 'JWT_SECRET');
          if (token && decoded.exp <= Date.now() / 1000) {
            ctx.response.body = {
              msg: 'token expired!'
            };
            ctx.response.status = 401;
          } else {
            ctx.state.userId= decoded.userId;
          }
        }
      }
    }
    await next()
  }
};