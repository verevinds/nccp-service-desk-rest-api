const db = require('../models');
const User = db.users;
const Department = db.departments;
const Position = db.positions;
const Op = db.Sequelize.Op;

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate requests
  if (!req.body.number) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "users" for request DB
  const users = {
    id: req.body.id,
    number: req.body.number,
    job: req.body.job,
    team: req.body.team,
    fired: req.body.fired,
    sex: req.body.sex,
    name1: req.body.name1,
    name2: req.body.name2,
    name3: req.body.name3,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    email: req.body.email,
    exmail: req.body.exmail,
    computer: req.body.computer,
    dob: req.body.dob,
    positionId: req.body.positionId,
    departmentId: req.body.departmentId,
  };

  // Save Users in the database
  User.create(users)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Users.`,
      });
    });
};

// Retrieve all Userss from the database
exports.findAll = (req, res) => {
  const name = req.query.name1;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition, include: [Department, Position] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving users.`,
      });
    });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Users with id=${id}`,
      });
    });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Users was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Users with id=${id}`,
      });
    });
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Users was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Users with id=${id}`,
      });
    });
};

// Delete all Userss from the database
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Userss were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Userss.',
      });
    });
};
