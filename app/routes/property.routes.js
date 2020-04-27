module.exports = (app) => {
  const properties = require('../controllers/property.controllers');

  let router = require('express').Router();

  router.post('/', properties.create);
  router.get('/', properties.findAll);

  app.use('/api/properties', router);
};
