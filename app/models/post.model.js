module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Post;
};
