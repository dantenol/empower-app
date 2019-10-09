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

  User.beforeRemote('prorortpe.__create__challenge', async (ctx) => {
    console.log(ctx.req);
    const body = ctx.req.body;
    body.modifiedAt = new Date();
    body.modifiedBy = ctx.req.accessToken.userId;
    return;
  });

  const uploadFileToS3 = (file) => {
    const buffer = file.data;
    return new Promise((resolve, reject) => {
      return s3.upload(
        {
          Bucket: 'empower-uploads',
          Key: file.name,
          Body: buffer,
        },
        (err, result) => {
          console.log(err, result);
          if (err) reject(err);
          else resolve(result);
        },
      );
    });
  };

  User.upload = async (req) => {
    if (!req.files) throw 'No files were uploaded.';
    let file = Object.keys(req.files)[0];
    const value = req.files[file];
    file = (file, value);
    const extension = /(?:\.([^.]+))?$/g.exec(file.name)[1];
    file.name = randomstring.generate() + '.' + extension;
    const { Key } = await uploadFileToS3(file);

    return { result: 'success', id: Key };
  };

  User.remoteMethod('upload', {
    accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }],
    returns: { root: true, type: 'object' },
    http: { path: '/uploadFile', verb: 'post' },
  });
};
