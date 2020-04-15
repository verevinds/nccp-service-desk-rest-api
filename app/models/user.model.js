module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.INTEGER,
    },
    access: {
      type: Sequelize.INTEGER,
    },
    departmentId: {
      type: Sequelize.INTEGER,
    },
    pc_name: {
      type: Sequelize.STRING,
    },
    pc_ip: {
      type: Sequelize.STRING,
    },
    post: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    jabber: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
