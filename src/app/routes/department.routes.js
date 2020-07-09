module.exports = (app) => {
  const department = require('../controllers/department.controllers');

  let router = require('express').Router();

  router.post('/', department.create);
  router.get('/', department.findAll);

  app.use('/api/departments', router);
};
