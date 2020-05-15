module.exports = (sequelize, Sequelize) => {
  const Position = sequelize.define('position', {
    name: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER,
    },
  });

  return Position;
};
