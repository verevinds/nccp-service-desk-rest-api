module.exports = (sequelize, Sequelize) => {
  const Incident = sequelize.define('incident', {
    startWork: {
      type: Sequelize.DATE,
      field: 'start_work',
    },
    dateCreate: {
      type: Sequelize.DATE,
      field: 'date_create',
    },
    currentResponsible: {
      type: Sequelize.INTEGER,
      field: 'current_responsible',
    },
    text: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    departmentId: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
    positionId: {
      type: Sequelize.INTEGER,
      field: 'position_id',
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    phone1: {
      type: Sequelize.STRING,
    },
    phone2: {
      type: Sequelize.STRING,
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

  return Incident;
};
