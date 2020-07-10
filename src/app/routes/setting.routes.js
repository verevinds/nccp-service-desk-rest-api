module.exports = (app) => {
  const setting = require('../controllers/setting.controllers');

  let router = require('express').Router();

  // Create new setting
  router.post('/', setting.create);

  // Retrieve all setting
  router.get('/', setting.findAll);
  // Retrieve setting
  router.get('/:id', setting.findOne);

  // Update a setting with id
  router.put('/:id', setting.update);
  router.delete('/:id', setting.delete);

  app.use('/api/settings', router);
};
