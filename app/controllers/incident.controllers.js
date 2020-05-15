const db = require('../models');
const Incident = db.incidents;
const Department = db.departments;
const Position = db.positions;
const Category = db.categories;
const Property = db.properties;
const CommentIncident = db.comments;
const User = db.users;
const Option = db.options;
const Op = db.Sequelize.Op;

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
  Incident.findAll({
    include: [
      { model: Department, attributes: ['name'] },
      Position,
      Category,
      Property,
      Option,
      { model: User, as: 'initiatorUser' },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
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

exports.findResponsible = (req, res) => {
  const departmentId = req.params.departmentId;

  Incident.findAll({
    where: {
      statusId: {
        [Op.ne]: '8388608',
      },
    },
    include: [
      {
        model: Category,
        attributes: ['departmentId', 'name'],
        required: true,
        where: {
          departmentId,
        },
      },
      Property,
      Option,
      { model: User, as: 'initiatorUser' },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Incident with number=${id}`,
      });
    });
};
exports.findHistory = (req, res) => {
  const departmentId = req.params.departmentId;

  Incident.findAll({
    where: {
      statusId: '8388608',
    },
    include: [
      {
        model: Category,
        attributes: ['departmentId', 'name'],
        required: true,
        where: {
          departmentId,
        },
      },
      Property,
      Option,
      { model: User, as: 'initiatorUser' },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Incident with number=${id}`,
      });
    });
};
exports.findMy = (req, res) => {
  const userNumber = req.params.userNumber;

  Incident.findAll({
    where: { userNumber },
    include: [
      { model: Department, attributes: ['name'] },
      Position,
      Category,
      Property,
      Option,
      { model: User, as: 'initiatorUser' },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Incident with number=${id}`,
      });
    });
};
// Find a single Incident with an id
exports.findOne = (req, res) => {};
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
exports.deleteAll = (req, res) => {};
