module.exports = (sequelize, Sequelize) => {
  const Priority = sequelize.define('priority', {
    level: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return Priority;
};
