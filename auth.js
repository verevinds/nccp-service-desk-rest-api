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
