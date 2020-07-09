const db = require('../models');
const Subscription = db.subscriptions;

exports.create = (req, res) => {
  if (!req.body.userNumberSubscription) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const subscription = {
    userNumberSubscription: req.body.userNumberSubscription,
    userNumber: req.body.userNumber,
    code: req.body.code,
    name: req.body.name,
    params: req.body.params,
    departmentId: req.body.departmentId,
    categoryId: req.body.categoryId,
    positionId: req.body.positionId,
    optionId: req.body.optionId,
    currentResponsible: req.body.currentResponsible,
  };

  Subscription.create(subscription)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Subscription.`,
      });
    });
};

exports.findAll = (req, res) => {
  let userNumberSubscription = req.query.userNumber;
  let combiner = userNumberSubscription
    ? { where: { userNumberSubscription } }
    : undefined;
  Subscription.findAll(combiner)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tuttorials.`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Subscription.findOne({
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

  Subscription.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Subscription was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Subscription with id=${id}. Maybe Subscription was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Subscription with id=${id}`,
      });
    });
};
// Delete a Subscription with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Subscription.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Subscription was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${userNumber}. Maybe Subscription was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Subscription with id=${userNumber}`,
      });
    });
};
