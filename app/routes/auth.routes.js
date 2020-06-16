module.exports = (app) => {
  const db = require('../models');
  const Department = db.departments;
  const Position = db.positions;
  const Access = db.access;
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
        db.users.findOne({ where: { email: login }, include: [Department, Position, Access] }).then((data) => {
          response.send(data);
        });
      } else {
        console.log(['Error', err.code, err.dn, err.message]);
        response.send(['Error', err.code, err.dn, err.message]);
      }
    }
    if (!password && !login) {
      // response.send(req.);
      let ip = req.connection.remoteAddress;
      ip = ip.slice(ip.lastIndexOf(':') + 1, ip.length);
      console.log(ip);
    } else authDN(client, login, password, output);
    if (!password) response.send(['Error']);
  });
  app.use('/api/auth', router);
};
