module.exports = (sequelize, Sequelize) => {
  const Responsible = sequelize.define('responsible', {
    userNumber: {
      type: Sequelize.INTEGER,
    },
    positionId: {
      type: Sequelize.INTEGER,
      field: 'position_id',
    },
    departmentId: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
    },
    propertyId: {
      type: Sequelize.INTEGER,
      field: 'property_id',
    },
    optionId: {
      type: Sequelize.INTEGER,
      field: 'option_id',
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });
  return Responsible;
};
