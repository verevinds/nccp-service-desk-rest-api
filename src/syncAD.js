var ldap = require('ldapjs');

var creds = {
  url: 'ldap://192.168.213.3:389',
  bindDN: 'OU=wc,DC=c31,DC=nccp,DC=ru',
};

var opts = {
  filter: '(objectClass=*)',
  scope: 'sub',
};

function authDN(client, dn, password, cb) {
  client.bind(dn, password, function (err) {
    client.unbind();
    cb(err === null, err);
  });
}

function output(res, err) {
  if (res) {
    console.log('success');
  } else {
    console.log(['Error', err.code, err.dn, err.message]);
  }
}

var client = ldap.createClient(creds);

authDN(client, 'Администратор@c31.nccp.ru', 'day21122012', output);

// console.log(Object.keys(state.users));
// await client.bind('Администратор@c31.nccp.ru', 'day21122012', (err) => {
//   if (err) console.error(err);
//   else {
//     console.log('Bind OK');

//     let opts = {
//       filter: '(objectClass=*)',
//       scope: 'sub',
//       attributes: ['samaccountname', 'displayname', 'mail'],
//     };

//     client.search('OU=wc,DC=c31,DC=nccp,DC=ru', opts, (err, res) => {
//       if (err) console.error(err);
//       else {
//         res.on('searchEntry', (entry) => {
//           // console.log('entry: ' + JSON.stringify(entry.object));
//           let subData = {
//             login: entry.object['sAMAccountName'],
//             name: entry.object['displayName'],
//             mail: entry.object['mail'],
//           };

//           // let index = state.users.findIndex((item) => item.name == subData.name);
//           // state.users[index] = { ...state.users[index], login: subData.login, mail: subData.mail };
//           let usersState = stateUser.get();
//           usersState = usersState.map((item) => {
//             if (item.name == subData.name) {
//               return { ...item, login: subData.login, mail: subData.mail };
//             }
//           });
//           console.log(usersState[0]);
//           stateUser.set(usersState);
//         });
//       }
//     });
//   }
// });

// await console.log(stateUser.get());

// await console.log(state.users[0]);

// client.bind('Администратор@c31.nccp.ru', 'day21122012', async function (err) {
//   if (err) console.error(err);
//   else {
//     console.log('Bind OK');
//     var opts = {
//       filter: '(objectClass=*)',
//       scope: 'sub',
//       attributes: ['samaccountname', 'displayname', 'mail'],
//     };

//     await client.search('OU=wc,DC=c31,DC=nccp,DC=ru', opts, function (err, res) {
//       if (err) {
//         console.error(err);
//       } else {
//         res.on('searchEntry', function (entry) {
//           // console.log('entry: ' + JSON.stringify(entry.object));
//           let subData = {
//             login: entry.object['sAMAccountName'],
//             name: entry.object['displayName'],
//             mail: entry.object['mail'],
//           };
//           // for (let key of state.users) {
//           //   console.log(state.users[key]);
//           // }
//           state.user
//           // // let userIndex = state.users.findIndex((item) => item.name == subData.name);
//           // if (~userIndex) {
//           //   user[userIndex].login = subData.login;
//           //   user[userIndex].mail = subData.mail;
//           //   finalyUser = user;
//           // }
//         });
//       }
//     });
//   }
// });
// await console.log('end');
// await console.log('ОТДЕЛ: ', state.departments[0]);
// await console.log('ДОЛЖНОСТЬ: ', state.positions[0]);
// await console.log(Object.keys(state.users[0]));
// await console.log(
//   'СОТРУДНИК: ',
//   state.users.find((item) => item.name == 'Веревин Денис Сергеевич'),
// );
