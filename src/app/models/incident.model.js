module.exports = (sequelize, Sequelize) => {
  const Incident = sequelize.define('incident', {
    initiatorDepartmentParent: {
      type: Sequelize.INTEGER,
      field: 'initiator_department_parent',
    },
    initiatorDepartment: {
      type: Sequelize.INTEGER,
      field: 'initiator_department',
    },
    hasVisa: {
      type: Sequelize.BOOLEAN,
      field: 'has_visa',
      defaultValue: true,
    },
    rulesId: {
      type: Sequelize.INTEGER,
      field: 'rules_id',
    },
    startWork: {
      type: Sequelize.DATE,
      field: 'start_work',
    },
    receiveat: {
      type: Sequelize.DATE,
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
    allowToCreateWork: {
      type: Sequelize.DATE,
      field: 'allow_to_create_work',
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
    allowToCreate: {
      type: Sequelize.BOOLEAN,
      field: 'allow_to_create',
      defaultValue: false,
    },
    params: {
      type: Sequelize.JSONB,
    },
  });

  return Incident;
};
