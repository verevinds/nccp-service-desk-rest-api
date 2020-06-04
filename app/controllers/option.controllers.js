const db = require('../models');
const Option = db.options;
const PropertyBind = db.propertyBinds;
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
    level: req.body.level,
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

  Option.findAll({
    where: condition,
    include: [
      {
        model: PropertyBind,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving Option`,
      });
    });
};

//! Удаление Опиции определенного по id из запроса
// Delete a Option with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Option.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Option was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Option with id=${id}. Maybe Option was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Option with id=${id}`,
      });
    });
};

//! Обновление Опции определенного по id из запроса
// Update a Option by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Option.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Option was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Option with id=${id}. Maybe Option was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Option with id=${id}`,
      });
    });
};
