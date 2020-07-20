module.exports = (sequelize, Sequelize) => {
  const ResourceBind = sequelize.define('resourceBind', {
    name: {
      type: Sequelize.STRING,
    },
    userNumber: {
      type: Sequelize.INTEGER,
    },
    resourceId: {
      type: Sequelize.INTEGER,
      field: 'resource_id',
    },
    level: {
      type: Sequelize.INTEGER,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });

  return ResourceBind;
};
