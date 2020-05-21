module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'By;Gfcdjhn#7',
  DB: 'servicedeskdb',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
