module.exports = (db) => {
  db.incidents.hasMany(db.rulesList);
  db.rulesList.belongsTo(db.incidents);
};
