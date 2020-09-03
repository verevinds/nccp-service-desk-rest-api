module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define('group', {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Group;
};
