const db = require('../models');
const Status = db.status;
const Op = db.Sequelize.Op;

// Create and Save a new status
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "status" for request DB
  const status = {
    id: req.body.id,
    name: req.body.name,
    noChange: req.body.noChange,
  };

  // Save status in the database
  Status.create(status)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the status.`,
      });
    });
};

// Retrieve all statuss from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Status.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving status.`,
      });
    });
};

// Find a single status with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Status.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving status with id=${id}`,
      });
    });
};

// Update a status by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Status.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `status was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update status with id=${id}. Maybe status was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update status with id=${id}`,
      });
    });
};

// Delete a status with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Status.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `status was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete status with id=${id}. Maybe status was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete status with id=${id}`,
      });
    });
};

// Delete all statuss from the database
exports.deleteAll = (req, res) => {
  Status.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} statuss were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all statuss.',
      });
    });
};
