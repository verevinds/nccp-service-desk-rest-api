module.exports = (app) => {
  const subscription = require('../controllers/subscription.controllers');

  let router = require('express').Router();

  // Create new subscription
  router.post('/', subscription.create);

  // Retrieve all subscription
  router.get('/', subscription.findAll);
  // Retrieve subscription
  router.get('/:id', subscription.findOne);

  // Update a subscription with id
  router.put('/:id', subscription.update);
  router.delete('/:id', subscription.delete);

  app.use('/api/subscriptions', router);
};
