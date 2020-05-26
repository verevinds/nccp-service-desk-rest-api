module.exports = (sequelize, Sequelize) => {
  const Files = sequelize.define('files', {
    name: {
      type: Sequelize.TEXT,
    },
    url: {
      type: Sequelize.TEXT,
    },
    userNumber: {
      type: Sequelize.INTEGER,
    },
    incidentId: {
      type: Sequelize.INTEGER,
    },
  });
  return Files;
};
