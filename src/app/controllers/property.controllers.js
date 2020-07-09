const db = require('../models');
const Property = db.properties;
const PropertyBind = db.propertyBinds;
const Option = db.options;
const Op = db.Sequelize.Op;

//! Создание и сохранение нового свойства
// Create and Save a new Property
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
  const property = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    priorityId: req.body.priorityId,
    params: req.body.params,
    level: req.body.level,
  };

  //* Сохранение объекта Property в базу данных
  // Save Users in the database
  Property.create(property)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occured while creating the Property`,
      });
    });
};

//! Получение всех Свойств из базы данных
// Retrieve all Properties from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Property.findAll({
    where: condition,
    include: [
      {
        model: PropertyBind,
        as: 'bind',
        include: [
          {
            model: Option,
            as: 'item',
            attributes: ['id', 'name', 'isArchive'],
          },
        ],
      },
    ],
  })
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Property.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Users with id=${id}`,
      });
    });
};

//! Обновление Свойства определенного по id из запроса
// Update a Property by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  console.error(id);
  console.error(req.body);
  Property.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Property was update successfully`,
        });
        console.error(`Property was update successfully`);
      } else {
        res.send({
          message: `Cannot update Property with id=${id}. Maybe Property was not found or req.body is empty!`,
        });
        console.error(`Cannot update Property with id=${id}. Maybe Property was not found or req.body is empty!`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Property with id=${id}`,
      });
    });
};

//! Удаление Свойства определенного по id из запроса
// Delete a Property with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Property.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Property was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Property with id=${id}. Maybe Property was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Property with id=${id}`,
      });
    });
};

//! Удаление всех Свойств
// Delete all Properties from the database
exports.deleteAll = (req, res) => {};
