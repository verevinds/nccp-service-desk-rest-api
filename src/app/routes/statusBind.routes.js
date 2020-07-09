module.exports = (app) => {
  const statusBind = require('../controllers/statusBind.controllers');

  let router = require('express').Router();

  //! Роуте для создания и сохранения новой опции в базе данных
  // Route for Create and Save "status"
  router.post('/', statusBind.create);

  //! Роуте получения всех записей в таблице "status"
  // Route for Retrieve all "status" from the database
  router.get('/', statusBind.findAll);

  //! Роуте "status" по id
  // Delete a status with id
  router.delete('/:id', statusBind.delete);

  //! Роуте "status" по id
  // Delete a status with id
  router.put('/:id', statusBind.update);

  app.use('/api/status/bind', router);
};
