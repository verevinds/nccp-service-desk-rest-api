module.exports = (app) => {
  const catalog = require('../controllers/catalog.controllers');

  let router = require('express').Router();

  router.get('/', catalog.findAll);

  app.use('/api/catalogs', router);
};
