const express = require('express');
const port = 3002;
const app = express();
app.get('/', (req, res) => {
  console.log('req');
  console.dir(req.connection.remoteAddress);
  res.send('Hello, Server!');
});
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
