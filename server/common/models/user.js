'use strict';
const randomstring = require('randomstring');
const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'cori' });

AWS.config.region = 'sa-east-1';
AWS.config.credentials = credentials;

const s3 = new AWS.S3();

module.exports = function(User) {
  User.beforeRemote('create', async (ctx) => {
    const body = ctx.req.body;
    body.modifiedAt = new Date();
    return;
  });

  User.beforeRemote('login', (ctx) => {
    const body = ctx.req.body;
    body.ttl = 315360000;
  });

  User.beforeRemote('prorortpe.__create__challenge', async (ctx) => {
    console.log(ctx.req);
    const body = ctx.req.body;
    body.modifiedAt = new Date();
    body.modifiedBy = ctx.req.accessToken.userId;
    return;
  });

  User.fbLogin = async (data) => {
    const AccessToken = User.app.models.AccessToken;
    if (data.status === 'unknown' || data.error) {
      throw 'Algo deu errado no login';
    }
    let query = {};
    if (data.email) {
      query.email = data.email;
    } else {
      query.fbId = data.id;
    }

    console.log(query);
    const usr = await User.findOne({
      where: query,
    });
    console.log(usr);
    if (!usr) {
      const newUsr = await User.create({
        name: data.name,
        email: data.email || '',
        fbId: data.id,
        password: randomstring.generate(6),
        modifiedAt: new Date(),
      });
      const newToken = {
        ttl: 315360000,
        created: new Date(),
        userId: String(newUsr.id),
      };
      const token = await AccessToken.upsert(newToken, { upsert: false });
      return { token, user: newUsr };
    }
    if (!usr.fbId) {
      throw 'Você já tem uma conta usando o email do Facebook: ' + usr.email;
    }
    if (usr.fbId) {
      if (data.id === usr.fbId) {
        const newToken = {
          ttl: 315360000,
          created: new Date(),
          userId: String(usr.id),
        };
        const token = await AccessToken.upsert(newToken, { upsert: false });
        return { token, user: usr };
      } else {
        throw 'Algo deu errado no login';
      }
    }
  };

  User.remoteMethod('fbLogin', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { root: true, type: 'object' },
    http: { path: '/fbLogin', verb: 'post' },
  });
};
