module.exports = (sequelize, Sequelize) => {
  const Match = sequelize.define('match', {
    incidentId: {
      type: Sequelize.INTEGER,
      field: 'incident_id',
    },
    params: {
      type: Sequelize.JSONB,
    },
    code: {
      type: Sequelize.INTEGER,
    },
    isMatch: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Match;
};
