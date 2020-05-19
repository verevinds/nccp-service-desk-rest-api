const db = require('../models');
const Category = db.categories;
const Property = db.properties;
const Option = db.options;
const Op = db.Sequelize.Op;

//Create and Save a new Categories
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "category" for request DB
  const category = {
    name: req.body.name,
    level: req.body.level,
    departmentId: req.body.departmentId,
  };

  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Categories.`,
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name1;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Category.findAll({ where: condition, include: [Property, Option] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving categories`,
      });
    });
};

// ! TODO: реализовать остальные методы
// Find a single Categories with an id
exports.findOne = (req, res) => {};

// Update a Categories by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Categories was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Categories with id=${id}. Maybe Categories was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Categories with id=${id}`,
      });
    });
};

// Delete a Categories with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          code: 200,
          message: `Category was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Category with id=${id}`,
      });
    });
};

// Delete all Categories from the database
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Category were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Category.',
      });
    });
};
