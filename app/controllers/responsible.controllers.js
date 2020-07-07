const db = require('../models');
const Responsible = db.responsible;

exports.create = (req, res) => {
  if (!req.body.positionId) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const responsible = {
    userNumber: req.body.userNumber,
    departmentId: req.body.departmentId,
    positionId: req.body.positionId,
    categoryId: req.body.categoryId,
    propertyId: req.body.propertyId,
    optionId: req.body.optionId,
  };

  Responsible.create(responsible)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Responsible.`,
      });
    });
};

exports.findAll = (req, res) => {
  const departmentId = req.params.departmentId;
  const userNumber = req.params.userNumber;
  const positionId = req.params.positionId;
  const where = {};

  if (departmentId) Object.assign(where, { departmentId });
  if (userNumber) Object.assign(where, { userNumber });
  if (positionId) Object.assign(where, { positionId });

  Responsible.findAll({ where })
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

  Responsible.findOne({
    where: { userNumber },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Auth with id=${userNumber}`,
      });
    });
};
exports.update = (req, res) => {
  const userNumber = req.params.userNumber;

  Responsible.update(req.body, { where: { userNumber } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Responsible was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Responsible with id=${userNumber}. Maybe Responsible was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Responsible with id=${userNumber}`,
      });
    });
};
// Delete a Responsible with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Responsible.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Responsible was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Responsible with id=${id}. Maybe Responsible was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Responsible with id=${id}`,
      });
    });
};
