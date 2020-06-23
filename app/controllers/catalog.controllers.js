const db = require('../models');
const Department = db.departments;
const Category = db.categories;
const Property = db.properties;
const Option = db.options;
const PropertyBind = db.propertyBinds;

exports.findAll = (req, res) => {
  Department.findAll({
    include: [
      {
        model: Category,
        include: [
          {
            model: Property,
            attributes: ['id', 'name', 'isArchive', 'categoryId', 'priorityId', 'level', 'deadline', 'params'],
            include: [
              {
                model: PropertyBind,
                as: 'bind',
                include: [
                  {
                    model: Option,
                    attributes: ['id', 'name', 'isArchive'],
                    as: 'item',
                  },
                ],
                attributes: ['id'],
              },
            ],
          },
          {
            model: Option,
            include: [
              {
                model: PropertyBind,
                as: 'bind',
              },
            ],
            attributes: ['id', 'name', 'categoryId', 'level', 'isArchive', 'deadline'],
          },
        ],
        attributes: ['id', 'name', 'departmentId', 'level', 'isArchive', 'deadline'],
      },
    ],
    attributes: ['id', 'name'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving categories`,
      });
    });
};

// ! TODO: реализовать остальные методы
// Find a single Categories with an id
exports.findOne = (req, res) => {};
