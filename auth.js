var ldap = require('ldapjs');

var creds = {
  url: 'ldap://192.168.213.3:389',
  bindDN: 'OU=wc,DC=c31,DC=nccp,DC=ru',
};

var opts = {
  filter: '(objectClass=*)',
  scope: 'sub',
};

module.exports = function authDN(client, dn, password, cb) {
  client.bind(dn, password, function (err) {
    client.unbind();
    cb(err === null, err);
  });
};

function output(res, err) {
  if (res) {
    console.log('success');
  } else {
    console.log(['Error', err.code, err.dn, err.message]);
  }
}

var client = ldap.createClient(creds);
