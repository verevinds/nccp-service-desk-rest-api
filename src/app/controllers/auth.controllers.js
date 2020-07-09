const db = require('../models');
const Auth = db.auths;
const Department = db.departments;
const Position = db.positions;
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.ip) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });

    return;
  }

  const auth = {
    ip: req.body.ip,
    userNumber: req.body.userNumber,
  };

  Auth.create(auth)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the Auth.`,
      });
    });
};

exports.findAll = (req, res) => {
  const ip = req.query.ip;
  var condition = ip ? { ip: { [Op.like]: `%${ip}%` } } : null;

  Auth.findAll({
    where: condition,
    include: [
      { model: User, include: [{ model: Department }, { model: Position }] },
    ],
  })
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
  const ip = req.params.ip;

  Auth.findByPk(ip)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Auth with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const ip = req.params.ip;

  Auth.destroy({ where: { ip } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Users was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Users with id=${id}`,
      });
    });
};
