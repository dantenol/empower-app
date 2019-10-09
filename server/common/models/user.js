'use strict';

module.exports = function(User) {
  User.beforeRemote('create', async (ctx) => {
    const body = ctx.req.body;
    body.modifiedAt = new Date();
    return;
  });

  User.beforeRemote('prorortpe.__create__challenge', async (ctx) => {
    console.log(ctx.req);
    const body = ctx.req.body;
    body.modifiedAt = new Date();
    body.modifiedBy = ctx.req.accessToken.userId;
    return;
  });
};
