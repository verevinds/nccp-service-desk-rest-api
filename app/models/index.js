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

//FIXME: провести рефакторинг кода для сокращения объема
db.users = require('./user.model.js')(sequelize, Sequelize);
db.departments = require('./department.model.js')(sequelize, Sequelize);
db.positions = require('./position.model.js')(sequelize, Sequelize);
db.auths = require('./auth.model.js')(sequelize, Sequelize);
db.priorities = require('./priority.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.properties = require('./property.model')(sequelize, Sequelize);
db.option = require('./option.model')(sequelize, Sequelize);

//! Осуществить связь One-To-One между User-Departments
// Implement associations "One-To-One" between table User to Departments
db.departments.hasOne(db.users);
db.users.belongsTo(db.departments);

//! Осуществить связь One-To-One между User-Positions
// Implement associations "One-To-One" between table User to Positions
db.positions.hasOne(db.users);
db.users.belongsTo(db.positions);

//! Осуществить связь One-To-One между Auth-User
// Implement associations "One-To-One" between table Auth to User
db.users.hasOne(db.auths);
db.auths.belongsTo(db.users);

//! Осуществить связь One-To-Many между Category-Property
// Implement associations "One-To-Many" between table Category to Property
db.categories.hasMany(db.properties);
db.properties.belongsTo(db.categories);

module.exports = db;
