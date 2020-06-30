module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define('subscription', {
    userNumber: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },

    code: {
      type: Sequelize.INTEGER,
    },
    params: {
      type: Sequelize.JSONB,
    },
    departmentId: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
    },
    positionId: {
      type: Sequelize.INTEGER,
      field: 'position_id',
    },
    optionId: {
      type: Sequelize.INTEGER,
      field: 'option_id',
    },
  });
  return Subscription;
};
