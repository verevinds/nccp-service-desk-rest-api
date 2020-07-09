module.exports = (app) => {
  const rulesList = require('../controllers/rulesList.controllers');

  let router = require('express').Router();

  // Retrieve all rulesList
  router.get('/', rulesList.findAll);
  // Retrieve rulesList
  router.get('/:id', rulesList.findOne);

  // Update a rulesList with id
  router.put('/isvisa', rulesList.isVisa);
  router.put('/:id', rulesList.update);
  router.delete('/:id', rulesList.delete);

  app.use('/api/rulesLists', router);
};
