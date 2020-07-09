module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define('department', {
    name: {
      type: Sequelize.STRING,
    },
    parent: {
      type: Sequelize.INTEGER,
    },
  });

  return Department;
};
