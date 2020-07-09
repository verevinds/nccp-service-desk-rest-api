module.exports = (app) => {
  const propertyBind = require('../controllers/propertyBind.controllers');

  let router = require('express').Router();

  //! Роуте для создания и сохранения новой опции в базе данных
  // Route for Create and Save "Property"
  router.post('/', propertyBind.create);

  //! Роуте получения всех записей в таблице "Property"
  // Route for Retrieve all "Property" from the database
  router.get('/', propertyBind.findAll);

  //! Роуте "Property" по id
  // Delete a Property with id
  router.delete('/:id', propertyBind.delete);

  //! Роуте "Property" по id
  // Delete a Property with id
  router.put('/:id', propertyBind.update);

  app.use('/api/properties/bind', router);
};
