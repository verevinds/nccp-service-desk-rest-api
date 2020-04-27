module.exports = (app) => {
  require('./position.routes')(app);
  require('./user.routes')(app);
  require('./department.routes')(app);
  require('./auth.routes')(app);
  require('./priority.routes')(app);
  require('./category.routes')(app);
  require('./property.routes')(app);
};
