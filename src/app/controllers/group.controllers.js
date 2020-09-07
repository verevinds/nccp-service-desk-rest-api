const db = require('../models');
const Group = db.group;
const GroupList = db.groupList;
const GroupProperty = db.groupProperty;
const Users = db.users;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const group = {
    name: req.body.name,
  };

  Group.create(group)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Group.`,
      });
    });
};

exports.findAll = (req, res) => {
  Group.findAll({
    include: [
      { model: GroupList, as: 'users', include: [{ model: Users, as: 'user' }] },
      { model: GroupProperty, as: 'properties' },
    ],
  })
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

  Group.findOne({
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

  Group.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Group was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Group with id=${id}`,
      });
    });
};
// Delete a Group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Group.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Group was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Group with id=${id}. Maybe Group was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Group with id=${id}`,
      });
    });
};
