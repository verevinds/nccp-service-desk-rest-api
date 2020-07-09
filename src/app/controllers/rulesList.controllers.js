const db = require('../models');
const RulesList = db.rulesList;
const Incident = db.incidents;

exports.findAll = (req, res) => {
  RulesList.findAll()
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

  RulesList.findOne({
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

  RulesList.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `RulesList was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update RulesList with id=${id}. Maybe RulesList was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update RulesList with id=${id}`,
      });
    });
};

exports.isVisa = (req, res) => {
  const positionId = req.body.positionId;
  const incidentId = req.body.incidentId;

  RulesList.update(req.body, { where: { positionId, incidentId } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `RulesList was update successfully`,
        });
        RulesList.findAll({ where: { positionId, incidentId } }).then((res) => {
          let hasVisa = true;
          res.forEach((item) => {
            if (item.dataValues.hasVisa === false) hasVisa = false;
          });
          if (hasVisa) Incident.update({ hasVisa, receiveAt: new Date() }, { where: { id: incidentId } });
          console.log('-^^^^^^^^^^^^^');
          console.log(res);
          console.log('-^^^^^^^^^^^^^');
        });
      } else {
        res.send({
          message: `Cannot update RulesList with id=${id}. Maybe RulesList was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update RulesList with id=${id}`,
      });
    });
};
// Delete a RulesList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  RulesList.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `RulesList was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete RulesList with id=${userNumber}. Maybe RulesList was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete RulesList with id=${userNumber}`,
      });
    });
};
