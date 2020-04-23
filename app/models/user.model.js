module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    number: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    positionId: {
      type: Sequelize.INTEGER,
      field: 'position_id',
    },
    departmentId: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
    fired: {
      type: Sequelize.INTEGER,
    },
    sex: {
      type: Sequelize.INTEGER,
    },
    name1: {
      type: Sequelize.STRING,
    },
    name2: {
      type: Sequelize.STRING,
    },
    name3: {
      type: Sequelize.STRING,
    },
    phone1: {
      type: Sequelize.STRING,
    },
    phone2: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    exmail: {
      type: Sequelize.STRING,
    },
    computer: {
      type: Sequelize.STRING,
    },
    login: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.DATEONLY,
    },
  });

  return User;
};
