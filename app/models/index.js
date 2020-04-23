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
db.auths = require('./auth.model.js')(sequelize, Sequelize);
db.priorities = require('./priority.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.properties = require('./property.model')(sequelize, Sequelize);

// Implement associations "One-To-One" between table User to Departments
db.departments.hasOne(db.users);
db.users.belongsTo(db.departments);

// Implement associations "One-To-One" between table User to Positions
db.positions.hasOne(db.users);
db.users.belongsTo(db.positions);

// Implement associations "One-To-One" between table User to Auth
db.users.hasOne(db.auths);
db.auths.belongsTo(db.users);

// Implement associations "One-To-Many" between table Category to Property
// db.users.hasMany(db.auths);
// db.auths.belongsTo(db.users);

module.exports = db;
