//
//   ! Модель таблицы "Option"
//    Опция - это третий параметр выбираемый в инциденте.
//   Он отвечает за группировку инцидентов по поппулятным запросам.
//
//    Связи:
//      One-To-Many:
//        "Categories-Options" по значению "categoryId"
//
//    Model table "Property"
//    Option is the third parameter selected in the incident.
//  He is responsible for grouping incidents according to popular requests.
//
//    Associations:
//      One-To-Many:
//        "Categories-Options" by the value of "categoryId"
//

module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define('option', {
    name: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
    },
    level: {
      type: Sequelize.INTEGER,
    },
  });

  return Option;
};
