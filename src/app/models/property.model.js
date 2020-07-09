//
//   ! Модель таблицы "Property"
//    Свойство - это второй параметр выбираемый в инциденте.
//   Он отвечает за приоритетность инцидента, и позволяет выбрать
//   следующие опции.
//
//    Связи:
//      One-To-Many:
//        "Categorys-Propertys" по значению "categoryId"
//      One-To-One:
//        "Properties-Priority" по значению "priorityId"
//
//    Model table "Property"
//    Property is the second parameter selected in the incident.
//   He is responsible for the priority of the incident, and allows you to choose
//   following options.
//
//    Associations:
//      One-To-Many:
//        "Categorys-Propertys" by the value of "categoryId"
//      One-To-One:
//        "Properties-Priority" by the value of "priorityId"
//

module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define('property', {
    name: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
    },
    priorityId: {
      type: Sequelize.INTEGER,
      field: 'priority_id',
    },
    level: {
      type: Sequelize.INTEGER,
    },
    isArchive: {
      type: Sequelize.BOOLEAN,
      field: 'is_archive',
    },
    deadline: {
      type: Sequelize.INTEGER,
    },
    params: {
      type: Sequelize.JSONB,
    },
  });
  return Property;
};
