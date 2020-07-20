const db = require('../models');
const Resource = db.resources;
const Department = db.departments;
const Position = db.positions;
const Users = db.users;
const ResourceBind = db.resourceBinds;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: `Название ресурса не может быть пустым!`,
    });
  }

  const resource = {
    name: req.body.name,
    holderId: req.body.holderId,
    creatorId: req.body.creatorId,
    creatorPositionId: req.body.creatorPositionId,
    creatorDepartmentId: req.body.creatorDepartmentId,
  };

  Resource.create(resource)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Произошла ошибка при создании ресурса`,
      });
    });
};

exports.findAll = (req, res) => {
  const attributesCreator = [
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
    'login',
    'dob',
    'photo',
  ];
  const creatorDepartmentId = req.query.creatorDepartmentId;
  const condition = creatorDepartmentId ? { creatorDepartmentId } : undefined;

  Resource.findAll({
    where: condition,
    include: [
      {
        model: Department,
        as: 'creatorDepartment',
        attributes: ['name', 'parent'],
      },
      { model: Position, as: 'creatorPosition', attributes: ['name', 'parent'] },
      {
        model: Users,
        as: 'creator',
        attributes: attributesCreator,
      },
      {
        model: ResourceBind,
        as: 'bind',
        include: [
          {
            model: Users,
            as: 'item',
          },
        ],
        attributes: ['id'],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Произошла ошибка при получении ресурсов`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Resource.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Ресурс был обновлён`,
        });
      } else {
        res.send({
          message: `Невозможно обновить ресурс с номером ${id}. Возможно, ресурс не найден!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ошибка обновления ресурса под номером ${id}`,
      });
    });
};
