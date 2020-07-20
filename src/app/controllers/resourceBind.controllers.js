const db = require('../models');
const ResourceBinds = db.resourceBinds;

exports.create = (req, res) => {
  if (!req.body.resourceId && !req.body.userNumber) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const resourceBinds = {
    userNumber: req.body.userNumber,
    resourceId: req.body.resourceId,
  };

  ResourceBinds.create(resourceBinds)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occured while creating the ResourceBinds`,
      });
    });
};

exports.findAll = (req, res) => {
  ResourceBinds.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving ResourceBinds`,
      });
    });
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {
  const id = req.params.id;

  ResourceBinds.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `ResourceBinds was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update ResourceBinds with id=${id}. Maybe ResourceBinds was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update ResourceBinds with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ResourceBinds.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `ResourceBinds was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete ResourceBinds with id=${id}. Maybe ResourceBinds was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete ResourceBinds with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {};
