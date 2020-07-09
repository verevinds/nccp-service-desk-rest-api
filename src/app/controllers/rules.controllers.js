const db = require('../models');
const Rules = db.rules;

exports.create = (req, res) => {
  if (!req.body.positionId) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const rule = {
    positionId: req.body.positionId,
    categoryId: req.body.categoryId,
    propertyId: req.body.propertyId,
    optionId: req.body.optionId,
  };

  Rules.create(rule)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Rules.`,
      });
    });
};

exports.findAll = (req, res) => {
  Rules.findAll()
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
  const id = req.params.id;

  Rules.findOne({
    where: { id },
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

  Rules.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Rules was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Rules with id=${id}. Maybe Rules was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Rules with id=${id}`,
      });
    });
};
// Delete a Rules with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rules.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Rules was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Rules with id=${userNumber}. Maybe Rules was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Rules with id=${userNumber}`,
      });
    });
};
