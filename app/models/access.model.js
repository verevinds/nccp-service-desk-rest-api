module.exports = (sequelize, Sequelize) => {
  const Access = sequelize.define('access', {
    userNumber: {
      type: Sequelize.INTEGER,
    },
    access: {
      type: Sequelize.INTEGER,
    },
  });
  return Access;
};
