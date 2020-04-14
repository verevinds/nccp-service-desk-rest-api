module.exports = (app) => {
  const users = require('../controllers/user.controllers');

  let router = require('express').Router();

  // Create new Toturial
  router.post('/', users.create);

  // Retrieve all Tutorials
  router.get('/', users.findAll);

  // Retrieve a single Tutorial with id
  router.get('/:id', users.findOne);

  // Update a Tutorial with id
  router.put('/:id', users.update);

  // Delete a Tutorial with id
  router.delete('/:id', users.delete);

  // Create a new Tutorial
  router.delete('/', users.deleteAll);

  app.use('/api/users', router);
};
