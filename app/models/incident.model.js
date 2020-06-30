module.exports = (sequelize, Sequelize) => {
  const Incident = sequelize.define('incident', {
    startWork: {
      type: Sequelize.DATE,
      field: 'start_work',
    },
    finishWork: {
      type: Sequelize.DATE,
      field: 'finish_work',
    },
    doneWork: {
      type: Sequelize.DATE,
      field: 'done_work',
    },
    closeWork: {
      type: Sequelize.DATE,
      field: 'close_work',
    },
    currentResponsible: {
      type: Sequelize.INTEGER,
      field: 'current_responsible',
    },
    text: {
      type: Sequelize.TEXT,
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
    consent: {
      type: Sequelize.BOOLEAN,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
    params: {
      type: Sequelize.JSONB,
    },
  });

  return Incident;
};
