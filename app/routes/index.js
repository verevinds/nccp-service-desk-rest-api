module.exports = (app) => {
  require('./position.routes')(app);
  require('./user.routes')(app);
  require('./department.routes')(app);
};
