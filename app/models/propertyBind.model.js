module.exports = (sequelize, Sequelize) => {
  const PropertyBind = sequelize.define('propertyBind', {
    name: {
      type: Sequelize.STRING,
    },
    optionId: {
      type: Sequelize.INTEGER,
      field: 'option_id',
    },
    propertyId: {
      type: Sequelize.INTEGER,
      field: 'property_id',
    },
    level: {
      type: Sequelize.INTEGER,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
  });

  return PropertyBind;
};
