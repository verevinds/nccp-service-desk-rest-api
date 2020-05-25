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

{
  //FIXME: провести рефакторинг кода для сокращения объема
  db.users = require('./user.model.js')(sequelize, Sequelize);
  db.departments = require('./department.model.js')(sequelize, Sequelize);
  db.positions = require('./position.model.js')(sequelize, Sequelize);
  db.auths = require('./auth.model.js')(sequelize, Sequelize);
  db.priorities = require('./priority.model.js')(sequelize, Sequelize);
  db.categories = require('./category.model.js')(sequelize, Sequelize);
  db.properties = require('./property.model')(sequelize, Sequelize);
  db.options = require('./option.model')(sequelize, Sequelize);
  db.incidents = require('./incident.model')(sequelize, Sequelize);
  db.status = require('./status.model')(sequelize, Sequelize);
  db.comments = require('./comment.model')(sequelize, Sequelize);
  db.access = require('./access.model')(sequelize, Sequelize);
}

{
  //! Осуществить связь One-To-One между User-Departments
  // Implement associations "One-To-One" between table User to Departments
  db.departments.hasOne(db.users);
  db.users.belongsTo(db.departments);

  //! Осуществить связь One-To-Many между Departments-Categories
  // Implement associations "One-To-Many" between table Departments to Categories
  db.departments.hasMany(db.categories);
  db.categories.belongsTo(db.departments);

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

  //! Осуществить связь One-To-Many между Category-Option
  // Implement associations "One-To-Many" between table Category to Option
  db.categories.hasMany(db.options);
  db.options.belongsTo(db.categories);

  //! Осуществить связь One-To-One между Incident-Departments
  // Implement associations "One-To-One" between table Incident to Departments
  db.departments.hasMany(db.incidents);
  db.incidents.belongsTo(db.departments);

  //! Осуществить связь One-To-One между Incident-Positions
  // Implement associations "One-To-One" between table Incident to Positions
  db.positions.hasMany(db.incidents);
  db.incidents.belongsTo(db.positions);

  //! Осуществить связь One-To-One между Incident-Property
  // Implement associations "One-To-One" between table Incident to Positions
  db.properties.hasMany(db.incidents);
  db.incidents.belongsTo(db.properties);

  //! Осуществить связь One-To-One между Incident-Option
  // Implement associations "One-To-One" between table Incident to Positions
  db.options.hasMany(db.incidents);
  db.incidents.belongsTo(db.options);

  //! Осуществить связь One-To-One между Incident-Category
  // Implement associations "One-To-One" between table Incident to Positions
  db.categories.hasMany(db.incidents);
  db.incidents.belongsTo(db.categories);

  //! Осуществить связь One-To-Many между Incident-Users
  // Implement associations "One-To-Many" between table Incident to Positions
  db.users.hasMany(db.incidents);
  db.incidents.belongsTo(db.users, {
    foreignKey: 'currentResponsible',
    targetKey: 'number',
    as: 'responsibleUser',
  });
  db.users.hasMany(db.incidents);
  db.incidents.belongsTo(db.users, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'initiatorUser',
  });
  //! Осуществить связь One-To-Many между Category-Property
  // Implement associations "One-To-Many" between table Category to Property
  db.incidents.hasMany(db.comments);
  db.comments.belongsTo(db.incidents);
  // //! Осуществить связь One-To-One между Incident-Category
  // // Implement associations "One-To-One" between table Incident to Positions
  db.users.hasMany(db.comments);
  db.comments.belongsTo(db.users, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'user',
  });
}

module.exports = db;
