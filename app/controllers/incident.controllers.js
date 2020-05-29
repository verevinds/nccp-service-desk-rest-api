const db = require('../models');
const Incident = db.incidents;
const Department = db.departments;
const Files = db.files;
const Category = db.categories;
const Property = db.properties;
const CommentIncident = db.comments;
const User = db.users;
const Option = db.options;
const Op = db.Sequelize.Op;
const io = db.io;

// Create and Save a new Incident
exports.create = (req, res) => {
  if (!req.body.userNumber) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "Incident" for request DB
  const incident = {
    startWork: req.body.startWork,
    currentResponsible: req.body.currentResponsible,
    text: req.body.text,
    level: req.body.level,
    statusId: req.body.statusId,
    departmentId: req.body.departmentId,
    userNumber: req.body.userNumber,
    categoryId: req.body.categoryId,
    propertyId: req.body.propertyId,
    optionId: req.body.optionId,
    consent: req.body.consent,
  };

  Incident.create(incident)
    .then((data) => {
      res.send(data);
      // io.on('connection', (client) => {
      //   client.broadcast.emit(String(incident.departmentId), data);
      // });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the Incidents`,
      });
    });
};

// Retrieve all Incidents from the database
exports.findAll = (req, res) => {
  let where = {};
  let whereCategory = {};
  const userNumber = req.query.userNumber;
  const departmentId = req.query.departmentId;
  const history = req.query.history;
  userNumber ? Object.assign(where, { userNumber }) : null;
  history
    ? Object.assign(where, {
        statusId: '8388608',
      })
    : Object.assign(where, {
        statusId: {
          [Op.ne]: '8388608',
        },
      });
  departmentId ? Object.assign(whereCategory, { departmentId }) : null;

  console.log('where', where);
  Incident.findAll({
    where,
    include: [
      { model: Department, attributes: ['name'] },
      {
        model: Category,
        attributes: ['departmentId', 'name', 'level'],
        required: true,
        where: whereCategory,
      },
      Property,
      Option,
      { model: Files, include: [{ model: User, as: 'user' }] },
      { model: User, as: 'initiatorUser' },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
    .then((data) => {
      // console.log('where', where);
      console.log('whereCategory', whereCategory);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving Incidents.`,
      });
    });
};

// Find a single Incident with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Incident.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Users with id=${id}`,
      });
    });
};
// Find a single Incident with an id

// Update a Incident by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Incident.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Incidents was update successfully`,
        });
      } else {
        res.send({
          message: `Cannot update Incidents with id=${id}. Maybe Incidents was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Incidents with id=${id}`,
      });
    });
};

// Delete a Incident with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Incident.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Incident was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete Incident with id=${id}. Maybe Incident was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Incident with id=${id}`,
      });
    });
};

// Delete all Incidents from the database
exports.deleteAll = (req, res) => {
  Incident.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Files were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Files.',
      });
    });
};
