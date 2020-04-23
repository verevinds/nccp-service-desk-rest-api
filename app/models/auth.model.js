module.exports = (sequelize, Seqelize) => {
  const Auth = sequelize.define('auth', {
    ip: {
      type: Seqelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userNumber: {
      type: Seqelize.INTEGER,
    },
  });

  return Auth;
};
