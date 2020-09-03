module.exports = (sequelize, Sequelize) => {
  const GroupProperty = sequelize.define('group_property', {
    groupId: {
      type: Sequelize.INTEGER,
      field: 'group_id',
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
  });
  return GroupProperty;
};
