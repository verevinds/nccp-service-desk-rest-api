const db = require('../models');
const Access = db.access;

exports.create = (req, res) => {
  if (!req.body.userNumber) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const access = {
    access: req.body.access,
    userNumber: req.body.userNumber,
  };

  Access.create(access)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Access.`,
      });
    });
};

exports.findAll = (req, res) => {
  Access.findAll()
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

exports.findOne = (req, res) => {
  const userNumber = req.params.userNumber;

  Access.findOne({
    where: { userNumber },
    attributes: ['access'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Auth with id=${id}`,
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Access.update(req.body, { where: { id } })
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
