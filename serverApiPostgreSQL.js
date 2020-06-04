const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const syncNCCP = require('./app/syncNCCP');
const cronJob = require('cron').CronJob;
const app = express();
const cors = require('cors');

var whitelist = [
  'http://localhost',
  'http://192.168.213.88',
  'http://localhost:8081',
  'http://192.168.214.106:8081',
  'http://srv-sdesk.c31.nccp.ru:8080',
  'http://srv-sdesk.c31.nccp.ru',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

//! Подключить к приложению cors с настройками corsOptions
// Connect to cors app with corsOptions settings
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'nccp-service-desk-client/build')));

//! Разбор запросов типа content-type - application/json
// Parse requests of content-type - application/json
app.use(bodyParser.json());

//! Разбор запросов типа content-type - application/x-www-form-urlencoded
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//! Подключить модели базы данных
// Import our model of database
const db = require('./app/models');

//! Подключиться к базе данных
// Connect of database
db.sequelize.sync();
//    In development, you may need to drop existing tables and re-sync database.
//    Just use force: true as following code:
//?    При разработке может потребоваться удалить существующие таблицы и выполнить
//?   повторную синхронизацию базы данных.
//?    Просто используйте force: true как следующий код:
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

//! Подключить роутеры
// Import & start routes
require('./app/routes')(app);

/** Создать расписание CRON: каждый день с 9-10 утра */
// const cron = new cronJob('* */58 11-12 * * *', () => {
//   console.log('run CRON');
//   syncNCCP();
//   console.log('stop CRON');
// });
// cron.start();const PORT = process.env.PORT || 80;
const upload = require('express-fileupload');
const fileUpload = require('./fileUpload');

app.use(upload());
app.post('/upload', fileUpload);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
