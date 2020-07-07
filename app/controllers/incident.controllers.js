const db = require('../models');
const Incident = db.incidents;
const Department = db.departments;
const Files = db.files;
const Category = db.categories;
const Property = db.properties;
const CommentIncident = db.comments;
const User = db.users;
const Option = db.options;
const Match = db.matches;
const Rules = db.rules;
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
  function create(incident) {
    Incident.create(incident)
      .then((data) => {
        res.send(data);
        // io.on('connection', (client) => {
        //   client.broadcast.emit(String(incident.departmentId), data);
        // });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Some error occurred while creating the Incidents`,
        });
      });
  }
  //Create object "Incident" for request DB
  const incident = {
    startWork: req.body.startWork,
    finishWork: req.body.finishWork,
    currentResponsible: req.body.currentResponsible,
    text: req.body.text,
    level: req.body.level,
    statusId: req.body.statusId,
    departmentId: req.body.departmentId,
    userNumber: req.body.userNumber,
    categoryId: req.body.categoryId,
    propertyId: req.body.propertyId,
    optionId: req.body.optionId,
    params: req.body.params,
    consent: req.body.consent,
  };

  if (!!incident.categoryId || !!incident.propertyId || !!incident.optionId) {
    Rules.findAll({
      where: {
        [Op.or]: [
          { categoryId: incident.categoryId },
          { propertyId: incident.propertyId },
          { optionId: incident.optionId },
        ],
      },
    }).then((res) => {
      let data = res.map((item) => item.dataValues);

      console.log('-----------------');
      console.log('data', data);
      console.log('-----------------');
    });
    create(incident);
  } else {
    create(incident);
  }
};

// Retrieve all Incidents from the database
exports.findAll = (req, res) => {
  let where = {};
  const userNumber = req.query.userNumber;

  const departmentId = req.query.departmentId;

  const arrayCategoryId = req.query.arrayCategoryId;
  const arrayPropertyId = req.query.arrayPropertyId;
  const arrayOptionId = req.query.arrayOptionId;

  console.log('------------------------');
  console.log('arrayCategoryId', arrayCategoryId);
  console.log('arrayPropertyId', arrayPropertyId);
  console.log('arrayOptionId', arrayOptionId);
  console.log('------------------------');
  let categories = [];
  let properties = [];
  let options = [];

  let arrayCategory = arrayCategoryId && JSON.parse(arrayCategoryId);
  let arrayProperties = arrayPropertyId && JSON.parse(arrayPropertyId);
  let arrayOption = arrayOptionId && JSON.parse(arrayOptionId);

  if (Array.isArray(arrayCategory) && arrayCategory.length > 0)
    arrayCategory.forEach((item) => {
      categories.push({ categoryId: item });
    });
  if (Array.isArray(arrayProperties) && arrayProperties.length > 0)
    arrayProperties.forEach((item) => {
      properties.push({ propertyId: item });
    });
  if (Array.isArray(arrayOptionId) && arrayOptionId.length > 0)
    arrayOptionId.forEach((item) => {
      options.push({ optionId: item });
    });

  let params = [...categories, ...properties, ...options];

  const history = req.query.history;
  userNumber ? Object.assign(where, { userNumber }) : null;
  if (departmentId && params.length < 1) params.push({ departmentId: departmentId });

  // if (params.length > 0) Object.assign(where, { [Op.or]: params });
  if (history) {
    let and = [];
    if (params.length) and.push({ [Op.or]: params });
    and.push({
      [Op.or]: [{ statusId: '8388608' }, { statusId: '8388604' }],
    });

    Object.assign(where, {
      [Op.and]: and,
    });
  } else
    Object.assign(where, {
      [Op.and]: [
        {
          statusId: {
            [Op.ne]: '8388604',
          },
        },
        {
          statusId: {
            [Op.ne]: '8388608',
          },
        },
        { [Op.or]: params },
      ],
    });
  console.log('------------------------');

  console.log('params', params);
  console.log('where', where);
  console.log('------------------------');
  Incident.findAll({
    where,
    include: [
      { model: Match, attributes: ['isMatch', 'id', 'incidentId', 'code', 'params'] },
      { model: Department, attributes: ['name'] },
      {
        model: Category,
        attributes: ['name', 'level'],
      },
      {
        model: Property,
        attributes: ['name', 'level'],
      },
      {
        model: Option,
        attributes: ['name', 'level'],
      },
      { model: Files, include: [{ model: User, as: 'user' }] },
      {
        model: User,
        as: 'initiatorUser',
        attributes: [
          'number',
          'positionId',
          'departmentId',
          'fired',
          'sex',
          'name1',
          'name2',
          'name3',
          'phone1',
          'phone2',
          'email',
          'exmail',
          'computer',
          'dob',
          'photo',
        ],
      },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving Incidents.`,
      });
    });
};

// Find a single Incident with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Incident.findOne({
    where: { id },
    include: [
      { model: Match, attributes: ['isMatch', 'id', 'incidentId', 'code', 'params'] },
      { model: Department, attributes: ['name'] },
      {
        model: Category,
        attributes: ['name', 'level'],
      },
      {
        model: Property,
        attributes: ['name', 'level'],
      },
      {
        model: Option,
        attributes: ['name', 'level'],
      },
      { model: Files, include: [{ model: User, as: 'user' }] },
      {
        model: User,
        as: 'initiatorUser',
        attributes: [
          'number',
          'positionId',
          'departmentId',
          'fired',
          'sex',
          'name1',
          'name2',
          'name3',
          'phone1',
          'phone2',
          'email',
          'exmail',
          'computer',
          'dob',
          'photo',
        ],
      },
      { model: User, as: 'responsibleUser' },
      { model: CommentIncident, include: [{ model: User, as: 'user' }] },
    ],
  })
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
          status: 200,
          message: `Incidents was update successfully`,
        });
      } else {
        res.send({
          status: 400,
          message: `Cannot update Incidents with id=${id}. Maybe Incidents was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
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
  // Incident.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({
  //       message: `${nums} Files were deleted successfully!`,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || 'Some error occurred while removing all Files.',
  //     });
  //   });
};
