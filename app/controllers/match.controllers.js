const db = require('../models');
const Match = db.matches;

exports.create = (req, res) => {
  if (!req.body.code) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const match = {
    incidentId: req.body.incidentId,
    code: req.body.code,
    params: req.body.params,
    isMatch: req.body.isMatch,
  };

  Match.create(match)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Match.`,
      });
    });
};

exports.findAll = (req, res) => {
  Match.findAll()
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

  Match.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Match with id=${id}`,
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  Match.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Match was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Match with id=${id}. Maybe Match was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Match with id=${id}`,
      });
    });
};
// Delete a Match with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const incidentId = req.query.incidentId;
  const where = id ? { id } : { incidentId };
  console.error(where);
  Match.destroy({ where })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Match was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Match with id=${id}. Maybe Match was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Match with id=${id}`,
      });
    });
};
