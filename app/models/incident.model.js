module.exports = (sequelize, Sequelize) => {
  const Incident = sequelize.define('incident', {
    startWork: {
      type: Sequelize.DATE,
      field: 'start_work',
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
    statusId: {
      type: Sequelize.INTEGER,
      field: 'status_id',
    },
    departmentId: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
    userNumber: {
      field: 'user_number',
      type: Sequelize.INTEGER,
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
