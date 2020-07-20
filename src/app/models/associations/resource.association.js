module.exports = (db) => {
  /** Создать связь для отдела*/
  db.departments.hasOne(db.resources, {
    foreignKey: 'creatorDepartmentId',
    targetKey: 'id',
    as: 'creatorDepartment',
  });
  db.resources.belongsTo(db.departments, {
    foreignKey: 'creatorDepartmentId',
    targetKey: 'id',
    as: 'creatorDepartment',
  });

  /** Создать связь для должности */
  db.positions.hasOne(db.resources, {
    foreignKey: 'creatorPositionId',
    targetKey: 'id',
    as: 'creatorPosition',
  });
  db.resources.belongsTo(db.positions, {
    foreignKey: 'creatorPositionId',
    targetKey: 'id',
    as: 'creatorPosition',
  });

  /** Создать связь для пользователей */
  /** Создатель ресурса */
  db.users.hasOne(db.resources, {
    foreignKey: 'creatorId',
    targetKey: 'number',
    as: 'creator',
  });
  db.resources.belongsTo(db.users, {
    foreignKey: 'creatorId',
    targetKey: 'number',
    as: 'creator',
  });
  /** Владелец ресурса */
  // db.users.hasOne(db.resources, {
  //   foreignKey: 'holderId',
  //   targetKey: 'number',
  //   as: 'holder',
  // });
  // db.resources.belongsTo(db.users, {
  //   foreignKey: 'holderId',
  //   targetKey: 'number',
  //   as: 'holder',
  // });

  /** Привязка */

  db.resources.hasMany(db.resourceBinds, {
    foreignKey: 'resourceId',
    targetKey: 'id',
    as: 'bind',
  });
  db.resourceBinds.belongsTo(db.resources);

  db.users.hasMany(db.resourceBinds, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'item',
  });
  db.resourceBinds.belongsTo(db.users, {
    foreignKey: 'userNumber',
    targetKey: 'number',
    as: 'item',
  });
};
