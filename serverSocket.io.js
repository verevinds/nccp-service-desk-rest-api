const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
var fs = require('fs');
const db = require('./app/models');
const Incident = db.incidents;

var privateKey = fs.readFileSync('./domain.key');
var certificate = fs.readFileSync('./domain.crt');
var credentials = { key: privateKey, cert: certificate };
const server = http.createServer(credentials, app);

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

  client.on('newIncident', (data) => {
    console.log(`${client.conn.id} newIncident:`, data);
    client.broadcast.emit(String(data.departmentId), data);
  });

  client.on('incidentUpdate', (data) => {
    Incident.findOne({ where: { id: data.id } }).then((res) => {
      let { currentResponsible, departmentId, userNumber } = res.dataValues;
      console.log('send');
      currentResponsible
        ? client.broadcast.emit(`updateResponsible${currentResponsible}`, res.dataValues)
        : client.broadcast.emit(`updateResponsibleDepartment${departmentId}`, res.dataValues);

      client.broadcast.emit(`updateIncidentOwner${userNumber}`, res.dataValues);
    });
  });
});

const port = 8000;
server.listen(port, () => {
  console.log('WebSocket listening on PORT ', port);
});
