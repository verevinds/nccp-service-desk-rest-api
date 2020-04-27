const db = require('../models');
const Property = db.properties;
const Op = db.Sequelize.Op;

//! Создание и сохранение нового свойства
// Create and Save a new Property
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //* Создание объекта Proporty для запросов с базой данных
  // Create object "Proporty" for request DB
  const property = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    priorityId: req.body.priorityId,
  };

  //* Сохранение объекта Property в базу данных
  // Save Users in the database
  Property.create(property)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occured while creating the Property`,
      });
    });
};

//! Получение всех Свойств из базы данных
// Retrieve all Properties from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Property.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving Property`,
      });
    });
};

//! Поиск одного Свойства по id
// Find a single Property with an id
exports.findOne = (req, res) => {};

//! Обновление Свойства определенного по id из запроса
// Update a Property by the id in the request
exports.update = (req, res) => {};

//! Удаление Свойства определенного по id из запроса
// Delete a Property with the specified id in the request
exports.delete = (req, res) => {};

//! Удаление всех Свойств
// Delete all Properties from the database
exports.deleteAll = (req, res) => {};
