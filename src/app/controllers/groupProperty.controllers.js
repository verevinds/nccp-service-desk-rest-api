const db = require('../models');
const GroupProperty = db.groupProperty;

exports.create = (req, res) => {
  if (!req.body.groupId) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const groupProperty = {
    groupId: req.body.groupId,
    categoryId: req.body.categoryId,
    propertyId: req.body.propertyId,
    optionId: req.body.optionId,
  };

  GroupProperty.create(groupProperty)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the GroupProperty.`,
      });
    });
};

exports.findAll = (req, res) => {
  GroupProperty.findAll()
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

  GroupProperty.findOne({
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

  GroupProperty.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `GroupProperty was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update GroupProperty with id=${id}. Maybe GroupProperty was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update GroupProperty with id=${id}`,
      });
    });
};
// Delete a GroupProperty with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  GroupProperty.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `GroupProperty was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete GroupProperty with id=${id}. Maybe GroupProperty was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete GroupProperty with id=${id}`,
      });
    });
};
