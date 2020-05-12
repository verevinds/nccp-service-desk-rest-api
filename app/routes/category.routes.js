module.exports = (app) => {
  const category = require('../controllers/category.controllers');

  let router = require('express').Router();

  // Create new Category
  router.post('/', category.create);

  // Retrieve all Category
  router.get('/', category.findAll);

  // Delete a Category with id
  router.delete('/:id', category.delete);
  router.delete('/', category.deleteAll);

  app.use('/api/categories', router);
};
