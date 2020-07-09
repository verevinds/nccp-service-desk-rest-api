module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define('status', {
    level: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    noChange: {
      type: Sequelize.BOOLEAN,
      field: 'no_change',
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });
  return Status;
};
