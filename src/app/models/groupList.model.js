module.exports = (sequelize, Sequelize) => {
  const GroupList = sequelize.define('group_list', {
    groupId: {
      type: Sequelize.INTEGER,
      field: 'group_id',
    },
    userNumber: {
      type: Sequelize.INTEGER,
    },
  });
  return GroupList;
};
