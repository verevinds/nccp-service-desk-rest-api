module.exports = (db) => {
  db.users.hasOne(db.rulesList, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'userVisa',
  });
  db.rulesList.belongsTo(db.users, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'userVisa',
  });
};
