module.exports = async function syncNCCP() {
  const axios = require('axios');
  const positions = require('./controllers/position.controllers');
  const departments = require('./controllers/department.controllers');
  const users = require('./controllers/user.controllers');
  const db = require('./models');
  const User = db.users;
  const Departments = db.departments;
  const Positions = db.positions;
  const status = require('./controllers/status.constrollers');

  axios
    .get('http://api.nccp-eng.ru/', {
      params: {
        method: 'users.get',
      },
    })
    .then((res) => {
      for (let key in res.data) {
        let data = {
          body: {
            number: key,
            positionId: res.data[key].job,
            departmentId: res.data[key].team,
            fired: res.data[key].fired,
            sex: res.data[key].sex,
            name1: res.data[key].name1,
            name2: res.data[key].name2,
            name3: res.data[key].name3,
            phone1: res.data[key].phone1,
            phone2: res.data[key].phone2,
            email: res.data[key].email,
            exmail: res.data[key].exmail,
            computer: res.data[key].computer,
            login: res.data[key].login,
            dob: res.data[key].dob,
            level: null,
            photo: res.data[key].photo,
          },
          isConsole: true,
        };

        User.create(data.body);
        User.update(data.body, { where: { number: key } });
      }
      console.log('Сотрудники обновлены');
    });

  axios
    .get('http://api.nccp-eng.ru/', {
      params: {
        method: 'jobs.get',
      },
    })
    .then((res) => {
      for (let key in res.data) {
        let data = {
          body: {
            id: key,
            name: res.data[key].name,
            parent: res.data[key].parent,
          },
          isConsole: true,
        };

        Departments.create(data.body);
        Departments.update(data.body, { where: { id: key } });
      }
      console.log('Отделы обновлены');
    });

  axios
    .get('http://api.nccp-eng.ru/', {
      params: {
        method: 'jobs.get',
      },
    })
    .then((res) => {
      for (let key in res.data) {
        let data = {
          body: {
            id: key,
            name: res.data[key].name,
            level: 0,
          },
          isConsole: true,
        };
        Positions.create(data.body);
        Positions.update(data.body, { where: { id: key } });
      }
      console.log('Должности обновлены');
    });
};
