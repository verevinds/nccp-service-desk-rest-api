const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();

require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
