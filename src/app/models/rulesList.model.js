module.exports = (sequelize, Sequelize) => {
  const RulesList = sequelize.define('rulesList', {
    positionId: {
      type: Sequelize.INTEGER,
      field: 'position_id',
    },
    incidentId: {
      type: Sequelize.INTEGER,
    },
    hasVisa: {
      type: Sequelize.BOOLEAN,
      field: 'has_visa',
      defaultValue: true,
    },
  });
  return RulesList;
};
