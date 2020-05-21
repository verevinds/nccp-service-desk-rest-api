const db = require('../models');
const Department = db.departments;
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  const department = {
    id: req.body.id,
    name: req.body.name,
    departmentId: req.body.departmentId,
  };

  if (req.isConsole) {
    Department.create(department)
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        console.log(
          err.message || `Some error occurred while creating the Department.`,
        );
      });
  } else {
    Department.create(department)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while creating the Department.`,
        });
      });
  }
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Department.findAll({
    attributes: ['id', 'name'],
    where: condition,
    include: [Category],
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
