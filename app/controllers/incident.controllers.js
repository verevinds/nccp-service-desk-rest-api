const db = require('../models');
const Incident = db.incidents;
const Department = db.departments;
const Position = db.positions;
const Op = db.Sequelize.Op;

// Create and Save a new Incident
exports.create = (req, res) => {
  if (!req.body.number) {
    res.status(400).send({
      message: `Content can not be empty!`,
    });
    return;
  }

  //Create object "Incident" for request DB
  const incident = {
    startWork: req.body.startWork,
    dateCreate: req.body.dateCreate,
    currentResponsible: req.body.currentResponsible,
    text: req.body.text,
    level: req.body.level,
    status: req.body.status,
    departmentId: req.body.departmentId,
    positionId: req.body.positionId,
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    category: req.body.category,
    property: req.body.property,
    option: req.body.option,
  };

  Incident.create(incident)
    .then((data) => {
      res.send(data);
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
  Incident.findAll({ include: [Department, Position] })
    .then((data) => {
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
exports.findOne = (req, res) => {};

// Update a Incident by the id in the request
exports.update = (req, res) => {};

// Delete a Incident with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Incidents from the database
exports.deleteAll = (req, res) => {};
