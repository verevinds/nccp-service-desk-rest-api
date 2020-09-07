module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define('group', {
    name: {
      type: Sequelize.STRING,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });
  return Group;
};
