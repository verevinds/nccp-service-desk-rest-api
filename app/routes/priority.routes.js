module.exports = (app) => {
  const priority = require('../controllers/priority.controllers');

  let router = require('express').Router();

  router.post('/', priority.create);
  router.get('/', priority.findAll);

  app.use('/api/priority', router);
};
