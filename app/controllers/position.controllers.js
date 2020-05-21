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
    id: req.body.id,
    name: req.body.name,
    level: req.body.level,
  };
  if (req.isConsole) {
    Positions.create(position)
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        console.log(
          err.message || `Some error occurred while creating the Department.`,
        );
      });
  } else {
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
  }
};

exports.findAll = (req, res) => {
  Positions.findAll()
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

// Update a Positions by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Positions.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Positions was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Positions with id=${id}. Maybe Positions was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Positions with id=${id}`,
      });
    });
};
