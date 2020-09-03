const db = require('../models');
const GroupList = db.groupList;

exports.create = (req, res) => {
  if (!req.body.groupId) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const groupList = {
    groupId: req.body.groupId,
    userNumber: req.body.userNumber,
  };

  GroupList.create(groupList)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the GroupList.`,
      });
    });
};

exports.findAll = (req, res) => {
  GroupList.findAll()
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

  GroupList.findOne({
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

  GroupList.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `GroupList was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update GroupList with id=${id}. Maybe GroupList was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update GroupList with id=${id}`,
      });
    });
};
// Delete a GroupList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  GroupList.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `GroupList was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete GroupList with id=${id}. Maybe GroupList was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete GroupList with id=${id}`,
      });
    });
};
