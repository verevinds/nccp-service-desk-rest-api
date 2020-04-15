module.exports = (app) => {
  const post = require('../controllers/post.controllers');

  let router = require('express').Router();

  router.post('/', post.create);
  router.get('/', post.findAll);

  app.use('/api/departments', router);
};
