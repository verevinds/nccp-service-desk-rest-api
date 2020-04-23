/**
 *  Модель отвечающая за структуру таблици Categorys
 *  Категория - это первый параметр выбираемый в инциденте.
 * Он отвечает за то к какому отделу отправиться инцидент.
 *
 *  Связи:
 *    one-to-many:
 *      Propertys-Categorys по значению categoryId
 *      Options-Categorys по значению categoryId
 *      Categorys-Responsibles
 *
 */
module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
    },
  });
};
