module.exports = (db) => {
  db.group.hasMany(db.groupList, { as: 'users' });
  db.groupList.belongsTo(db.group);

  db.group.hasMany(db.groupProperty, { as: 'properties' });
  db.groupProperty.belongsTo(db.group);

  db.groupList.hasMany(db.groupProperty, {
    foreignKey: 'groupId',
    sourceKey: 'groupId',
    as: 'properties',
  });

  db.groupList.belongsTo(db.users, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'user',
  });
};
