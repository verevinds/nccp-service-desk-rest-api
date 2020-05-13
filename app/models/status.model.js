module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define('status', {
    level: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Status;
};
