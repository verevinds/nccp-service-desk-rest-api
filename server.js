const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//! Cоздать express приложение
// Create an express application
const app = express();

var whitelist = [
  'http://localhost:5000',
  'http://localhost:8081',
  'http://192.168.214.106:5000',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
//! Создать переменную с настройками для cors
// Create a variable with settings for cors
// const corsOptions = {
//   origin: 'http://localhost:5000',
// };

//! Подключить к приложению cors с настройками corsOptions
// Connect to cors app with corsOptions settings
app.use(cors());
// app.use(cors(corsOptions));

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

//! Определить номер порта на котором будет запущено приложение
// Determine the port number on which the application will run
const PORT = process.env.PORT || 8080;

//! Начать прослушивать на выбранном порту
// Start listen on the selected port
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
