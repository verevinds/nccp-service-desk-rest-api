const db = require('../models');
const Files = db.files;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Files
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "Files" for request DB
  const file = {
    id: req.body.id,
    name: req.body.name,
    url: req.body.url,
    userNumber: req.body.userNumber,
    incidentId: req.body.incidentId,
  };

  // Save Files in the database
  Files.create(file)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Files.`,
      });
    });
};

// Retrieve all FilesIncident from the database
exports.findAll = (req, res) => {
  Files.findAll({
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

// Find a single Files with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Files.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Files with id=${id}`,
      });
    });
};

// Update a Files by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Files.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Files was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Files with id=${id}. Maybe Files was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Files with id=${id}`,
      });
    });
};

// Delete a Files with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Files.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Files was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Files with id=${id}. Maybe Files was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Files with id=${id}`,
      });
    });
};

// Delete all FilesIncident from the database
exports.deleteAll = (req, res) => {
  Files.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Files were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Files.',
      });
    });
};
