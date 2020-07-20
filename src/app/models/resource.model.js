module.exports = (sequelize, Sequelize) => {
  const Resource = sequelize.define('resource', {
    name: {
      type: Sequelize.STRING,
    },
    holderId: {
      type: Sequelize.INTEGER,
      field: 'holder_id',
    },
    creatorId: {
      type: Sequelize.INTEGER,
      field: 'creator_id',
    },
    creatorPositionId: {
      type: Sequelize.INTEGER,
      field: 'creator_position_id',
    },
    creatorDepartmentId: {
      type: Sequelize.INTEGER,
      field: 'creator_department_id',
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });
  return Resource;
};
