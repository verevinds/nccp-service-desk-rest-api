module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define('auth', {
    ip: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userNumber: {
      type: Sequelize.INTEGER,
    },
  });

  return Auth;
};
