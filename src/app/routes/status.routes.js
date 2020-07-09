module.exports = (app) => {
  const status = require('../controllers/status.constrollers');

  let router = require('express').Router();

  // Create new status
  router.post('/', status.create);

  // Retrieve all status
  router.get('/', status.findAll);

  // Retrieve a single status with id
  router.get('/:id', status.findOne);

  // Update a status with id
  router.put('/:id', status.update);

  // Delete a status with id
  router.delete('/:id', status.delete);

  // Create a new status
  router.delete('/', status.deleteAll);

  app.use('/api/status', router);
};
