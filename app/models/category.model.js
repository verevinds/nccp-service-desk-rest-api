// /
//    Модель таблицы "Categories"
//    Категория - это первый параметр выбираемый в инциденте.
//   Он отвечает за то к какому отделу отправиться инцидент.
//
//    Связи:
//      One-To-Many:
//        "Properties-Categories" по значению "Id"
//        "Options-Categories" по значению "Id"
//        "Categories-Responsibles" по значению "categoryId"
//
//
//
//    Model responsible for the structure of the "Categories" table
//    "Category" is the first parameter selected in the incident.
//   He is responsible for which department the incident will go to.
//
//    Associations:
//      One-To-Many:
//        Properties-Categories by value "Id"
//        Options-Categories by value "Id"
//        Categories-Responsibles by value "categoryId"
//  /

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
    },
    departmentId: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
  });
  return Category;
};
