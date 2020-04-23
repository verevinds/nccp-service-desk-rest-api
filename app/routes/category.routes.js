module.exports = (app) => {
  const category = require('../controllers/category.controllers');

  let router = require('express').Router();

  // Create new Users
  router.post('/', category.create);

  // Retrieve all Users
  router.get('/', category.findAll);

  app.use('/api/categories', router);
};
