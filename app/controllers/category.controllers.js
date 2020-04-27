const db = require('../models');
const Category = db.categories;
const Property = db.properties;
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

  Category.findAll({ where: condition, include: [Property] })
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
exports.update = (req, res) => {};

// Delete a Categories with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Categories from the database
exports.deleteAll = (req, res) => {};
