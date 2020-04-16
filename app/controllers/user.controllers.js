const db = require('../models');
const User = db.users;
const Department = db.departments;
const Position = db.positions;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  // Create a Tutorial
  const users = {
    id: req.body.id,
    name: req.body.name,
    number: req.body.number,
    access: req.body.access,
    departmentId: req.body.departmentId,
    pc_name: req.body.pc_name,
    pc_ip: req.body.pc_ip,
    positionId: req.body.positionId,
    email: req.body.email,
    jabber: req.body.jabber,
  };

  // Save Tutorial in the database
  User.create(users)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Tutorial.`,
      });
    });
};

// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition, include: [Department, Position] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tuttorials.`,
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Tutorial with id=${id}`,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Tutorial was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Tutorial with id=${id}`,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Tutorial was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Tutorial with id=${id}`,
      });
    });
};

// Delete all Tutorials from the database
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};
