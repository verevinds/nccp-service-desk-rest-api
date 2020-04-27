const db = require('../models');
const Option = db.options;
const Op = db.Sequelize.Op;

//! Создание и сохранение новой опции
// Create and Save a new Option
exports.create = (req, res) => {
  //* Проверить сущевствет поле name в запросе
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //* Создание объекта Proporty для запросов с базой данных
  // Create object "Proporty" for request DB
  const option = {
    name: req.body.name,
    categoryId: req.body.categoryId,
  };

  //* Сохранение объекта Property в базу данных
  // Save Users in the database
  Option.create(option)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occured while creating the Option`,
      });
    });
};

//! Получение всех Свойств из базы данных
// Retrieve all Properties from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Option.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving Option`,
      });
    });
};
