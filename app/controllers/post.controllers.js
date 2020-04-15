const db = require('../models');
const Posts = db.posts;
const Op = sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const post = {
    name: req.body.name,
    postId: req.body.postId,
  };

  Posts.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while creating the Department.`,
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.body.name;
  var condition = name
    ? { name: { [Op.like]: `%${name}%` } }
    : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving tuttorials.`,
      });
    });
};
