module.exports = (app) => {
  const priority = require('../controllers/priority.controllers');

  let router = require('express').Router();

  router.post('/', priority.create);
  router.get('/', priority.findAll);
  // Update a Priority with id
  router.put('/:level', priority.update);

  app.use('/api/priority', router);
};
