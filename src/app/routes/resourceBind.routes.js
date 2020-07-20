module.exports = (app) => {
  const resourceBind = require('../controllers/resourceBind.controllers');

  let router = require('express').Router();

  //! Роуте для создания и сохранения новой опции в базе данных
  // Route for Create and Save "resourceBind"
  router.post('/', resourceBind.create);

  //! Роуте получения всех записей в таблице "resourceBind"
  // Route for Retrieve all "resourceBind" from the database
  router.get('/', resourceBind.findAll);

  //! Роуте "resourceBind" по id
  // Delete a resourceBind with id
  router.delete('/:id', resourceBind.delete);

  //! Роуте "resourceBind" по id
  // Delete a resourceBind with id
  router.put('/:id', resourceBind.update);

  app.use('/api/resources/bind', router);
};
