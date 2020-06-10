const express = require('express');
const app = express();
const https = require('https');
var fs = require('fs');

var privateKey = fs.readFileSync('./devcert.key');
var certificate = fs.readFileSync('./devcert.crt');
var credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

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
  console.log(`${client.conn.id}:`);
  client.emit('newIncident', () => {
    console.log('newIncident');
  });
  client.on('newIncident', (data) => {
    console.log(`${client.conn.id} newIncident:`, data);
    client.broadcast.emit(String(data.departmentId), data);
  });
});

const port = 8000;
server.listen(port, () => {
  console.log('WebSocket listening on PORT ', port);
});
