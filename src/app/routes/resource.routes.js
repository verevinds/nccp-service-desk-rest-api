module.exports = (app) => {
  const resource = require('../controllers/resource.controllers');

  let router = require('express').Router();

  // Показать все ресурсы
  router.get('/', resource.findAll);
  //Создание ресурса
  router.post('/', resource.create);
  // Обновление ресурса
  router.put('/:id', resource.update);

  app.use('/api/resources', router);
};
