module.exports = (sequelize, Sequelize) => {
  const StatusBind = sequelize.define('statusBind', {
    name: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
    },
    statusId: {
      type: Sequelize.INTEGER,
      field: 'status_id',
    },
    level: {
      type: Sequelize.INTEGER,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });

  return StatusBind;
};
