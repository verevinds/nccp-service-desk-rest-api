const db = require('../models');
const Settings = db.settings;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const settings = {
    name: req.body.name,
    isOn: req.body.isOn,
  };

  Settings.create(settings)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Settings.`,
      });
    });
};

exports.findAll = (req, res) => {
  Settings.findAll()
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

  Settings.findOne({
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

  Settings.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Settings was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Settings with id=${id}. Maybe Settings was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Settings with id=${id}`,
      });
    });
};
// Delete a Settings with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Settings.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Settings was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Settings with id=${id}. Maybe Settings was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Settings with id=${id}`,
      });
    });
};
