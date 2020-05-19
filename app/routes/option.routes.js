module.exports = (app) => {
  const options = require('../controllers/option.controllers');

  let router = require('express').Router();

  //! Роуте для создания и сохранения новой опции в базе данных
  // Route for Create and Save "Option"
  router.post('/', options.create);

  //! Роуте получения всех записей в таблице "Option"
  // Route for Retrieve all "Option" from the database
  router.get('/', options.findAll);

  //! Роуте "Option" по id
  // Delete a Option with id
  router.delete('/:id', options.delete);

  //! Роуте "Options" по id
  // Delete a Options with id
  router.put('/:id', options.update);

  app.use('/api/options', router);
};
