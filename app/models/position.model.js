module.exports = (sequelize, Sequelize) => {
  const Position = sequelize.define('position', {
    name: {
      type: Sequelize.STRING,
    },
    parent: {
      type: Sequelize.INTEGER,
    },
    level: {
      type: Sequelize.INTEGER,
    },
  });

  return Position;
};
