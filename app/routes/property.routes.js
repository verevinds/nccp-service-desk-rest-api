module.exports = (app) => {
  const properties = require('../controllers/property.controllers');

  let router = require('express').Router();

  //! Роуте для создания и сохранения новой опции в базе данных
  // Route for Create and Save "Property"
  router.post('/', properties.create);

  //! Роуте получения всех записей в таблице "Property"
  // Route for Retrieve all "Property" from the database
  router.get('/', properties.findAll);

  //! Роуте "Property" по id
  // Delete a Property with id
  router.delete('/:id', properties.delete);

  app.use('/api/properties', router);
};