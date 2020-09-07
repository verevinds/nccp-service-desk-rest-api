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
const RulesList = db.rulesList;
const Positions = db.positions;
const Resources = db.resources;
const ResourceBind = db.resourceBinds;
const GroupProperty = db.groupProperty;
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
    Incident.create(incident).then((data) => {
      // io.on('connection', (client) => {
      //   client.broadcast.emit(String(incident.departmentId), data);
      // });

      const resources = [];
      console.log('------==========----------');
      console.log('data', data);
      console.log('------==========----------');
      incident.params.map((row, indexRow) => {
        row.map((col, indexCol) => {
          if (col) {
            const { select, value } = col;
            if (select === 'resources') resources.push(value);
          }
        });
      });

      const resourcesUnique = Array.from(new Set(resources));

      const paramsOr = resourcesUnique.map((resource) => {
        return { id: resource };
      });

      async function createRules() {
        await Resources.findAll({
          where: { [Op.or]: paramsOr },
          include: [
            {
              model: ResourceBind,
              as: 'bind',

              attributes: ['id', 'userNumber'],
            },
          ],
        }).then((resources) => {
          resources.forEach((resource) => {
            const holders = resource.dataValues.bind;

            holders.forEach((holder) => {
              console.log('------==========----------');
              console.log('resource', holder.dataValues);
              console.log('------==========----------');
              if (holder.dataValues.userNumber) {
                let rulesList = {
                  incidentId: data.dataValues.id,
                  userNumber: holder.dataValues.userNumber,
                  hasVisa: false,
                };
                RulesList.create(rulesList);
                Incident.update({ hasVisa: false, statusId: 8388606 }, { where: { id: data.dataValues.id } });
              }
            });
          });
        });

        console.log(
          `[
          { categoryId: incident.categoryId },
          { propertyId: incident.propertyId },
          { optionId: incident.optionId },
        ]`,
          [{ categoryId: incident.categoryId }, { propertyId: incident.propertyId }, { optionId: incident.optionId }],
        );
        await Rules.findAll({
          where: {
            [Op.or]: [
              { categoryId: incident.categoryId },
              { propertyId: incident.propertyId },
              { optionId: incident.optionId },
            ],
          },
        }).then((res) => {
          let rules = res.map((item) => item.dataValues);
          rules.forEach((item) => {
            if (item.positionId) {
              let rulesList = { incidentId: data.dataValues.id, positionId: item.positionId, hasVisa: false };
              RulesList.create(rulesList);
              Incident.update({ hasVisa: false, statusId: 8388606 }, { where: { id: data.dataValues.id } });
            }
          });
        });

        // await RulesList.findOne({ where: { incidentId: data.dataValues.id } }).then((resolve) => {
        //   console.log('------==========----------');
        //   console.log('resolve.dataValues', resolve);
        //   console.log('------==========----------');
        //   if (!resolve) Incident.update({ hasVisa: true, statusId: 0 }, { where: { id: data.dataValues.id } });
        // });

        await res.send(data);
      }

      createRules();
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
    initiatorDepartmentParent: req.body.initiatorDepartmentParent,
    initiatorDepartment: req.body.initiatorDepartment,
    allowToCreate: req.body.allowToCreate,
    userNumber: req.body.userNumber,
    categoryId: req.body.categoryId,
    propertyId: req.body.propertyId,
    optionId: req.body.optionId,
    params: req.body.params,
    consent: req.body.consent,
    rulesId: req.body.rulesId,
    hasVisa: req.body.hasVisa,
    allowToCreateWork: req.body.allowToCreateWork,
    receiveAt: req.body.receiveAt,
  };

  create(incident);
};
function incidentOptions(where) {
  return {
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
      {
        model: RulesList,
        include: [
          {
            model: Positions,
            include: [
              {
                model: User,
                as: 'users',
                attributes: ['number', 'name1', 'name2', 'name3', 'fired'],
                where: { fired: 0 },
              },
            ],
            attributes: ['id'],
          },
        ],
        attributes: ['hasVisa', 'userNumber', 'positionId', 'updatedAt'],
      },
    ],
  };
}
function incidentFindAll(res, where) {
  Incident.findAll(incidentOptions(where))
    .then((data) => {
      // console.log('----------------');
      // console.log('data', data);
      // console.log('----------------');
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving Incidents.`,
      });
    });
}

function incidentParams(req) {
  const arrayCategoryId = req.query.arrayCategoryId;
  const arrayPropertyId = req.query.arrayPropertyId;
  const arrayOptionId = req.query.arrayOptionId;

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
  if (Array.isArray(arrayOption) && arrayOption.length > 0)
    arrayOption.forEach((item) => {
      options.push({ optionId: item });
    });

  return [...categories, ...properties, ...options];
}

// Retrieve all Incidents from the database
exports.findAll = (req, res) => {
  incidentFindAll(res);
};
// Retrieve all Incidents from the database
exports.findAllAllowToCreate = (req, res) => {
  incidentFindAll(res);
};
// Retrieve all Incidents from the database
exports.findAllMy = (req, res) => {
  let where = {};
  const userNumber = req.query.userNumber;
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
      { userNumber },
    ],
  });

  incidentFindAll(res, where);
};

// Retrieve all Incidents from the database
exports.findAllWork = (req, res) => {
  (async function () {
    let where = {};
    const groupId = req.query.groups;
    let propertyId;
    let properties;
    if (groupId) {
      properties = await GroupProperty.findAll({
        where: { groupId: { [Op.or]: SON.parse(groupId) } },
      });
      propertyId = await properties.map((item) => item.dataValues.propertyId);
      await console.log('--------------------------');
      await console.log('propertyId----', propertyId);
      await console.log('--------------------------');
    }
    const departmentId = req.query.departmentId;

    let params = await incidentParams(req);

    const allowToCreate = true;
    // console.log('---------------------------');
    // console.log('allowToCreate', allowToCreate);
    // console.log('---------------------------');
    if (departmentId && params.length < 1) params.push({ departmentId: departmentId });
    and = await [
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
      {
        statusId: {
          [Op.ne]: '8388607',
        },
      },
      { allowToCreate: allowToCreate },
    ];
    if (groupId) and.push({ propertyId: { [Op.or]: propertyId } });
    else and.push({ departmentId });

    Object.assign(where, {
      [Op.and]: and,
    });

    await incidentFindAll(res, where);
  })();
};

exports.findAllVisa = (req, res) => {
  const hasVisa = req.query.hasVisa;
  const positionId = req.query.positionId;
  const userNumber = req.query.userNumber;

  let or = [];
  RulesList.findAll({ where: { [Op.or]: [{ positionId }, { userNumber }] } }).then((resolve) => {
    console.log('------------');
    // console.log('hasVisa', hasVisa);
    // console.log('positionId', positionId);
    or = resolve.map((item) => {
      return { id: item.dataValues.incidentId };
    });
    console.log('or', or);
    // console.log('where', { [Op.or]: or });
    incidentFindAll(res, {
      [Op.and]: [
        { [Op.or]: or },
        { allowToCreate: true },
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
        {
          statusId: {
            [Op.ne]: '8388605',
          },
        },
        { hasVisa: false },
      ],
    });

    // console.log('------------');
    // console.log({
    //   [Op.and]: [
    //     { [Op.or]: or },
    //     { allowToCreate: true },
    //     {
    //       statusId: {
    //         [Op.ne]: '8388604',
    //       },
    //     },
    //     {
    //       statusId: {
    //         [Op.ne]: '8388608',
    //       },
    //     },
    //     {
    //       statusId: {
    //         [Op.ne]: '8388605',
    //       },
    //     },
    //     { hasVisa: false },
    //   ],
    // });
  });
};
// Retrieve all Incidents from the database
exports.findAllHistory = (req, res) => {
  const userNumber = req.query.userNumber;
  const departmentId = req.query.departmentId;

  let where = {};
  let params = incidentParams(req);
  let and = [
    {
      [Op.or]: [{ statusId: '8388608' }, { statusId: '8388604' }],
    },
  ];

  if (userNumber) Object.assign(where, { userNumber });
  if (departmentId && params.length < 1) params.push({ departmentId: departmentId });
  if (params.length) and.push({ [Op.or]: params });
  else ({ userNumber });

  Object.assign(where, {
    [Op.and]: and,
  });

  incidentFindAll(res, where);
};
// Find a single Incident with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const where = { id };

  Incident.findOne(incidentOptions(where))
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
