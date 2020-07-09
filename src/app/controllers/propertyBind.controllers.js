const db = require('../models');
const PropertyBind = db.propertyBinds;

exports.create = (req, res) => {
  if (!req.body.optionId && !req.body.propertyId) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const propertyBind = {
    optionId: req.body.optionId,
    propertyId: req.body.propertyId,
  };

  PropertyBind.create(propertyBind)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occured while creating the PropertyBind`,
      });
    });
};

exports.findAll = (req, res) => {
  PropertyBind.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving PropertyBind`,
      });
    });
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {
  const id = req.params.id;

  PropertyBind.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `PropertyBind was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update PropertyBind with id=${id}. Maybe PropertyBind was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update PropertyBind with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PropertyBind.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `PropertyBind was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete PropertyBind with id=${id}. Maybe PropertyBind was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete PropertyBind with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {};
