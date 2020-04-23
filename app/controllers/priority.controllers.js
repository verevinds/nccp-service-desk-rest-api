const db = require('../models');
const Priority = db.prioritys;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const priority = {
    level: req.body.level,
    name: req.body.name,
  };

  Priority.create(priority)
    .then((data) => {
      res.send(data);
    })
    .cath((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Priority.`,
      });
    });
};

exports.findAll = (req, res) => {
  const level = req.query.level;
  var condition = level ? { level: { [Op.like]: `%${name}%` } } : null;

  Priority.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      resizeTo.status(500).send({
        message: err.message || `Some error occurred while retrieving Priority`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `"Priority" was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update "Priority" with id=${id}. Maybe "Priority" was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update "Priority" with id=${id}`,
      });
    });
};
