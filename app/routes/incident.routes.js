module.exports = (app) => {
  const incident = require('../controllers/incident.controllers');

  let router = require('express').Router();

  // Create new Incident
  router.post('/', incident.create);

  // Retrieve all Incident
  router.get('/', incident.findAll);

  // Retrieve a single Incident with id
  router.get('/:id', incident.findOne);

  // Update a Incident with id
  router.put('/:id', incident.update);

  // Delete a Incident with id
  router.delete('/:id', incident.delete);

  // Create a new Incident
  router.delete('/', incident.deleteAll);

  app.use('/api/incidents', router);
};
