module.exports = (app) => {
  const incident = require('../controllers/incident.controllers');

  let router = require('express').Router();

  // Create new Incident
  router.post('/', incident.create);

  // Retrieve all Incident
  router.get('/work', incident.findAllWork);
  router.get('/department', incident.findAllWork);
  router.get('/my', incident.findAllMy);
  router.get('/visa', incident.findAllVisa);
  router.get('/all', incident.findAll);
  router.get('/history', incident.findAllHistory);

  // Retrieve a single Incident with id
  router.get('/work/:id', incident.findOne);

  // Update a Incident with id
  router.put('/:id', incident.update);

  // Delete a Incident with id
  router.delete('/:id', incident.delete);

  // Create a new Incident
  router.delete('/', incident.deleteAll);

  app.use('/api/incidents', router);
};
