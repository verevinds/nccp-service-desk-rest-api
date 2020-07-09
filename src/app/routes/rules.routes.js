module.exports = (app) => {
  const rule = require('../controllers/rules.controllers');

  let router = require('express').Router();

  // Create new rule
  router.post('/', rule.create);

  // Retrieve all rule
  router.get('/', rule.findAll);
  // Retrieve rule
  router.get('/:id', rule.findOne);

  // Update a rule with id
  router.put('/:id', rule.update);
  router.delete('/:id', rule.delete);

  app.use('/api/rules', router);
};
