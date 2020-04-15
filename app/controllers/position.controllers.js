const db = require('../models');
const Positions = db.positions;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const position = {
    name: req.body.name,
    positionId: req.body.positionId,
  };

  Positions.create(position)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Department.`,
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.body.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Positions.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tuttorials.`,
      });
    });
};
