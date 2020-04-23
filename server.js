const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ip = require('ip');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');

db.sequelize.sync();
/**
 *  In development, you may need to drop existing tables and re-sync database.
 *  Just use force: true as following code:
 *
 *  При разработке может потребоваться удалить существующие таблицы и выполнить
 * повторную синхронизацию базы данных.
 *  Просто используйте force: true как следующий код:
 */
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

require('./app/routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
