//** Экспорт модулей */
const sql = require('mssql');
const db = require('./app/models');

class State {
  constructor() {}
  users = [];
  get() {
    return this.users;
  }
  set(value) {
    this.users = value;
  }
}

async function runSync(sql, db) {
  console.log('start');
  let localState = new State();
  const ldap = require('ldapjs');
  const client = ldap.createClient({
    url: 'ldap://192.168.213.3:389',
  });
  const config = {
    user: 'webuser',
    password: 'webuser1c',
    server: 'srv-1c.c31.nccp.ru',
    database: 'inz',
  };
  var state = {
    users: undefined,
    departments: undefined,
    positions: undefined,
  };
  const Department = db.departments;
  const Positions = db.positions;
  const departmentSelect = `select CONVERT(varchar(max), _IDRRef, 2) as _IDRRef, CONVERT(varchar(max), _ParentIDRRef, 2) as _ParentIDRRef, _Code, _Description from _Reference156`;
  const positionSelect = `select CONVERT(varchar(max), _IDRRef, 2) as _IDRRef, _Code, _Description from _Reference76`;
  const userSelect = constructorQuery(
    `CONVERT(varchar(max), _IDRRef, 2) as _IDRRef, CONVERT(varchar(max), _Fld2549RRef, 2) as _Fld2549RRef, _Code, _Description, CONVERT(varchar(max), _Fld22763RRef, 2) as _Fld22763RRef, CONVERT(varchar(max), _Fld22764RRef, 2) as _Fld22764RRef, _Fld22766`,
    `_Reference193`,
  );
  const userContactSelect = constructorQuery(
    `CONVERT(varchar(max), _IDRRef, 2) as _IDRRef, _Fld3054, CONVERT(varchar(max), _Fld3059RRef, 2) as _Fld3059RRef`,
    `_Reference235`,
  );

  function departmentCreate(item) {
    const department = {
      id: item._Code,
      name: item._Description,
    };

    Department.create(department)
      .then((data) => {
        console.log(`${data.dataValue.name} добавлен`);
      })
      .catch((err) => {
        console.log(err.message || `Произошла ошибка при создании отдела.`);
      });
  }

  function positionCreate(item) {
    const position = {
      id: item._Code,
      name: item._Description,
      level: null,
    };

    Positions.create(position)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message || `Произошла ошибка при создании должности.`);
      });
  }

  function constructorQuery(column, table, where) {
    return `select ${column || ''} from ${table} ${where ? `where ${where}` : ''}`;
  }

  function sync1C(syncSelect) {
    let res = sql
      .connect(config)
      .then(() => {
        return sql.query(syncSelect);
      })
      .then((result) => {
        return result.recordsets[0];
      })
      .catch((err) => {
        console.dir(err);
      });

    return res;
  }

  let departments = await sync1C(departmentSelect);
  let positions = await sync1C(positionSelect);
  let users = await sync1C(userSelect);
  let usersContact = await sync1C(userContactSelect);

  state.departments = await departments.map((item) => {
    return {
      ref: item._IDRRef.trim(),
      id: item._Code.trim(),
      name: item._Description.trim(),
    };
  });

  state.positions = await positions.map((item) => {
    return {
      ref: item._IDRRef.trim(),
      id: item._Code.trim(),
      name: item._Description.trim(),
    };
  });

  let newUser = [];
  await users.forEach(function (item) {
    let dateFired = new Date(item._Fld22766);
    let department = state.departments.find((dep) => dep.ref == item._Fld22763RRef);
    let position = state.positions.find((dep) => dep.ref == item._Fld22764RRef);

    let departmentId = department ? department.id.trim() : null;
    let positionId = position ? position.id.trim() : null;

    if (!isNaN(Number(item._Code.trim())))
      newUser.push({
        number: item._Code.trim(),
        ref: item._Fld2549RRef.trim(),
        name: item._Description.trim(),
        departmentId,
        positionId,
        fired: dateFired.getFullYear() === 2001 ? 0 : 1,
        phone1: null,
        phone2: null,
        email: null,
        exmail: null,
        computer: null,
        login: null,
        dob: null,
        photo: null,
      });
  });
  state.users = newUser;
  newUser = [];
  await usersContact.forEach((item) => {
    let dateDob = new Date(item._Fld3054);
    dateDob.setFullYear(dateDob.getFullYear() - 2000);

    let dob = new Date(dateDob.getTime() - dateDob.getTimezoneOffset() * 60000).toISOString().split('T')[0];

    let refUser = state.users.find((user) => user.ref == item._IDRRef);

    if (!!refUser) {
      newUser.push({
        ...refUser,
        dob,
        sex: item._Fld3059RRef && item._Fld3059RRef.charAt(0) == 'A' ? 1 : 2,
      });
    }
  });
  state.users = newUser;
  console.log(state.users[0]);
}

runSync(sql, db);
