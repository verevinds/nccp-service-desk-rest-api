const db = require('../models');
const Priority = db.prioritys;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const priority = {
    level: req.body.level,
    name: req.body.name,
  };

  Priority.create(priority)
    .then((data) => {
      res.send(data);
    })
    .cath((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Priority.`,
      });
    });
};
