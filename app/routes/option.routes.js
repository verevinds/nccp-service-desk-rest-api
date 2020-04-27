module.exports = (app) => {
  const options = require('../controllers/option.controllers');

  let router = require('express').Router();

  //! Роуте для создания и сохранения новой опции в базе данных
  // Route for Create and Save "Property"
  router.post('/', options.create);

  //! Роуте получения всех записей в таблице "Property"
  // Route for Retrieve all "Property" from the database
  router.get('/', options.findAll);

  app.use('/api/options', router);
};
