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
        message: err.message || `Some error occurred while creating the Access.`,
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
        message: err.message || `Some error occurred while retrieving tuttorials.`,
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
  const userNumber = req.params.userNumber;

  Access.update(req.body, { where: { userNumber } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Access was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Access with id=${id}. Maybe Access was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Access with id=${id}`,
      });
    });
};
// Delete a Access with the specified id in the request
exports.delete = (req, res) => {
  const userNumber = req.params.userNumber;
  const access = req.query.access;
  console.log('where', { userNumber, access });

  Access.destroy({ where: { userNumber, access } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Access was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Access with id=${userNumber}. Maybe Access was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Access with id=${userNumber}`,
      });
    });
};
