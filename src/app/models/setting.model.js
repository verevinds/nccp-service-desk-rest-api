module.exports = (sequelize, Sequelize) => {
  const Retting = sequelize.define('setting', {
    name: {
      type: Sequelize.STRING,
    },
    isOn: {
      type: Sequelize.BOOLEAN,
      field: 'is_on',
    },
  });
  return Retting;
};
