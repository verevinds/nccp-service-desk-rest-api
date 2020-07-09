module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    text: {
      type: Sequelize.TEXT,
    },
    userNumber: {
      type: Sequelize.INTEGER,
    },
    incidentId: {
      type: Sequelize.INTEGER,
    },
  });
  return Comment;
};
