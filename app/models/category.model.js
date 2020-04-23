/**
 *  Модель отвечающая за структуру таблици "Categorys"
 *  "Категория" - это первый параметр выбираемый в инциденте.
 * Он отвечает за то к какому отделу отправиться инцидент.
 *
 *  Связи:
 *    One-To-Many:
 *      "Propertys-Categorys" по значению "propertyId"
 *      "Options-Categorys" по значению "optionId"
 *      "Categorys-Responsibles" по значению "categoryId"
 *
 *****************************************************************
 *
 *  Model responsible for the structure of the "Categorys" table
 *  "Category" is the first parameter selected in the incident.
 * He is responsible for which department the incident will go to.
 *
 *  Associations:
 *    One-To-Many:
 *      Propertys-Categorys by value "propertyId"
 *      Options-Categorys by value "optionId"
 *      Categorys-Responsibles by value "categoryId"
 */

module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
    },
    optionId: {
      type: Sequelize.INTEGER,
    },
    propertyId: {
      type: Sequelize.INTEGER,
    },
  });
};
