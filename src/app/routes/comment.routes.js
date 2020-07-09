module.exports = (app) => {
  const comments = require('../controllers/comment.controllers');

  let router = require('express').Router();

  // Create new comments
  router.post('/', comments.create);

  // Retrieve all comments
  router.get('/', comments.findAll);

  // Retrieve a single comments with id
  router.get('/:id', comments.findOne);

  // Update a comments with id
  router.put('/:id', comments.update);

  // Delete a comments with id
  router.delete('/:id', comments.delete);

  // Create a new comments
  router.delete('/', comments.deleteAll);

  app.use('/api/comments', router);
};
