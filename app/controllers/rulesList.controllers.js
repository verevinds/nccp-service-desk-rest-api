const db = require('../models');
const RulesList = db.rulesList;

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
