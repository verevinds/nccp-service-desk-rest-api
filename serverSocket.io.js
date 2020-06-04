const express = require('express');
const app = express();
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
  client.on('newIncident', (data) => {
    client.broadcast.emit(String(data.departmentId), data);
  });
});

const port = 8000;
server.listen(port, () => {
  console.log('WebSocket listening on PORT ', port);
});
