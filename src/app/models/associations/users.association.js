module.exports = (db) => {
  db.users.hasMany(db.groupList, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'groups',
  });
};
