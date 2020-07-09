module.exports = (app) => {
  const responsible = require('../controllers/responsible.controllers');

  let router = require('express').Router();

  // Create new responsible
  router.post('/', responsible.create);

  // Retrieve all responsible
  router.get('/', responsible.findAll);
  // Retrieve responsible
  router.get('/:userNumber', responsible.findOne);

  // Update a responsible with id
  router.put('/:userNumber', responsible.update);
  router.delete('/:id', responsible.delete);

  app.use('/api/responsibles', router);
};
