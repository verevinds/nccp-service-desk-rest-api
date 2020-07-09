module.exports = (app) => {
  const files = require('../controllers/files.controllers');

  let router = require('express').Router();

  // Create new files
  router.post('/', files.create);

  // Retrieve all files
  router.get('/', files.findAll);

  // Retrieve a single files with id
  router.get('/:id', files.findOne);

  // Update a files with id
  router.put('/:id', files.update);

  // Delete a files with id
  router.delete('/:id', files.delete);

  // Create a new files
  router.delete('/', files.deleteAll);

  app.use('/api/files', router);
};
