module.exports = (sequelize, Sequelize) => {
  const Rules = sequelize.define('rules', {
    positionId: {
      type: Sequelize.INTEGER,
      field: 'position_id',
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
  return Rules;
};
