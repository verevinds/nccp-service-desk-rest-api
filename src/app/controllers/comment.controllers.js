const db = require('../models');
const CommentIncident = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.text) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "Comment" for request DB
  const commentIncident = {
    id: req.body.id,
    text: req.body.text,
    userNumber: req.body.userNumber,
    incidentId: req.body.incidentId,
  };

  // Save Comment in the database
  CommentIncident.create(commentIncident)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Comment.`,
      });
    });
};

// Retrieve all CommentIncident from the database
exports.findAll = (req, res) => {
  const name = req.query.name1;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  CommentIncident.findAll({
    where: condition,
    include: [{ model: User, as: 'user' }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving users.`,
      });
    });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CommentIncident.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Comment with id=${id}`,
      });
    });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CommentIncident.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Comment was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Comment with id=${id}`,
      });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CommentIncident.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Comment was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Comment with id=${id}`,
      });
    });
};

// Delete all CommentIncident from the database
exports.deleteAll = (req, res) => {
  CommentIncident.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} CommentIncident were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while removing all CommentIncident.',
      });
    });
};
