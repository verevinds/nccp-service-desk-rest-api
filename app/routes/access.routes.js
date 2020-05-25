module.exports = (app) => {
  const access = require('../controllers/access.controllers');

  let router = require('express').Router();

  // Create new Category
  router.post('/', access.create);

  // Retrieve all Category
  router.get('/', access.findAll);
  // Retrieve Category
  router.get('/:userNumber', access.findOne);

  // Update a Category with id
  router.put('/:id', access.update);

  app.use('/api/access', router);
};
