module.exports = (app) => {
  const db = require('../models');
  let router = require('express').Router();

  router.post('/', (req, response) => {
    const ldap = require('ldapjs');
    const login = req.body.login;
    const password = req.body.password;

    console.log('req.body', req.body);
    console.log('login', login);
    console.log('password', password);
    const creds = {
      url: 'ldap://192.168.213.3:389',
      bindDN: 'OU=wc,DC=c31,DC=nccp,DC=ru',
    };

    const client = ldap.createClient(creds);

    function authDN(client, dn, password, cb) {
      client.bind(dn, password, function (err) {
        client.unbind();
        cb(err === null, err);
      });
    }

    function output(res, err) {
      if (res) {
        console.log('success');
        db.users.findOne({ where: { email: login } }).then((data) => {
          response.send(data);
        });
      } else {
        console.log(['Error', err.code, err.dn, err.message]);
        response.send(['Error', err.code, err.dn, err.message]);
      }
    }
    if (!password) response.send(['Error']);
    else authDN(client, login, password, output);
  });
  app.use('/api/auth', router);
};
