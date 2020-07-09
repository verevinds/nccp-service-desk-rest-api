module.exports = (app) => {
  const position = require('../controllers/position.controllers');

  let router = require('express').Router();

  router.post('/', position.create);
  router.get('/', position.findAll);
  router.put('/:id', position.update);
  router.delete('/all', position.deleteAll);

  app.use('/api/positions', router);
};
