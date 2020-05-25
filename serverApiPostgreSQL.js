const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const syncNCCP = require('./app/syncNCCP');
const cronJob = require('cron').CronJob;
const app = express();
const cors = require('cors');

var whitelist = [
  'http://localhost',
  'http://192.168.213.77',
  'http://localhost:8081',
  'http://192.168.214.106:8081',
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

/////////////////Загрузка файлов////////////////////////////
const upload = require('express-fileupload');
const { v1 } = require('uuid');
const fs = require('fs');

app.use(upload());
app.post('/upload', (req, res, next) => {
  console.log(req.files);
  if (req.files) {
    console.log(req.files);
    let file = req.files.file;
    let filename = file.name;
    let md5 = file.md5;
    file.mv(`./upload/${v1()}.${filename}`, (err) => {
      if (err) {
        console.log(err);
        res.send('error occured');
      } else {
        res.send({
          message: `Файл ${filename} успешно добавлен`,
          url: `http://192.168.213.77/restapi/upload/${v1()}.${filename}`,
          filename,
        });
      }
    });
  }
});
///////////////////////////////////////////

//! Определить номер порта на котором будет запущено приложение
// Determine the port number on which the application will run
const PORT = process.env.PORT || 8080;

// // //! Начать прослушивать на выбранном порту
// // // Start listen on the selected port
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

new cronJob('* */5 9-18 * * *', () => {
  syncNCCP();
});

////////////////////////////////////////////////////////////////////////

const http = require('http');

const server = http.createServer(app);

const sio = require('socket.io')(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin, //or the specific origin you want to give access to,
      'Access-Control-Allow-Credentials': true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

sio.on('connection', (client) => {
  console.log('Connected!');
  client.on('newIncident', (data) => {
    console.log('newIncident: ', String(data));
    client.broadcast.emit(String(data), 'update');
  });
});

const port = 8000;
server.listen(port, () => {
  console.log('WebSocket listening on PORT ', port);
});
