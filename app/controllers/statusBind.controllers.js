const db = require('../models');
const StatusBind = db.statusBinds;

exports.create = (req, res) => {
  if (!req.body.statusId && !req.body.categoryId) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const statusBind = {
    categoryId: req.body.categoryId,
    statusId: req.body.statusId,
  };

  StatusBind.create(statusBind)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occured while creating the StatusBind`,
      });
    });
};

exports.findAll = (req, res) => {
  StatusBind.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving StatusBind`,
      });
    });
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {
  const id = req.params.id;

  StatusBind.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `StatusBind was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update StatusBind with id=${id}. Maybe StatusBind was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update StatusBind with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  StatusBind.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `StatusBind was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete StatusBind with id=${id}. Maybe StatusBind was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete StatusBind with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {};
