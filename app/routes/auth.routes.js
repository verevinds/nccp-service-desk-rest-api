module.exports = (app) => {
  const auth = require('../controllers/auth.controllers');

  let router = require('express').Router();

  router.post('/', auth.create);
  router.get('/', auth.findAll);
  router.get('/:ip', auth.findAll);
  // router.get('/:ip', auth.findOne);

  app.use('/api/auth', router);
};
