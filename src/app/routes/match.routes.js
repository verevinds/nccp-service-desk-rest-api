module.exports = (app) => {
  const match = require('../controllers/match.controllers');

  let router = require('express').Router();

  // Create new Match
  router.post('/', match.create);

  // Retrieve all Match
  router.get('/', match.findAll);
  // Retrieve Match
  router.get('/:id', match.findOne);

  // Update a Match with id
  router.put('/:id', match.update);
  router.delete('/:id', match.delete);
  router.delete('/', match.delete);

  app.use('/api/matches', router);
};
