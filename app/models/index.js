const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect,
  pool,
} = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
  operatorsAliases: false,
  pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.departments = require('./department.model.js')(sequelize, Sequelize);
db.positions = require('./position.model.js')(sequelize, Sequelize);

// Implement associations "One-To-Many" between table User to Departments
db.departments.hasOne(db.users);
db.users.belongsTo(db.departments);

// Implement associations "One-To-Many" between table User to Departments
db.positions.hasOne(db.users);
db.users.belongsTo(db.positions);

module.exports = db;
