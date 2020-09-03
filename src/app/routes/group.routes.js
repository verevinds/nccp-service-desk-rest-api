module.exports = (app) => {
  const group = require('../controllers/group.controllers');
  const groupList = require('../controllers/groupList.controllers');
  const groupProperty = require('../controllers/groupProperty.controllers');

  let router = require('express').Router();

  // Create new groupProperty
  router.post('/property/', groupProperty.create);
  // Retrieve all groupProperty
  router.get('/property/', groupProperty.findAll);
  // Retrieve groupProperty
  router.get('/property/:id', groupProperty.findOne);
  // Update a groupProperty with id
  router.put('/property/:id', groupProperty.update);
  router.delete('/property/:id', groupProperty.delete);

  // Create new groupList
  router.post('/list/', groupList.create);
  // Retrieve all groupList
  router.get('/list/', groupList.findAll);
  // Retrieve groupList
  router.get('/list/:id', groupList.findOne);
  // Update a groupList with id
  router.put('/list/:id', groupList.update);
  router.delete('/list/:id', groupList.delete);

  // Create new group
  router.post('/', group.create);
  // Retrieve all group
  router.get('/', group.findAll);
  // Retrieve group
  router.get('/:id', group.findOne);
  // Update a group with id
  router.put('/:id', group.update);
  router.delete('/:id', group.delete);

  app.use('/api/groups', router);
};
