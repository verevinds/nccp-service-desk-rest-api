const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
var fs = require('fs');
const db = require('./app/models');
const { default: Axios } = require('axios');
const { exit } = require('process');
const Incident = db.incidents;
const Subscriptions = db.subscriptions;
const Users = db.users;
const Position = db.positions;
const Responsible = db.responsible;
const Op = db.Sequelize.Op;

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

function sendMailMyDepartment(props) {
  let { item, incidentResolve, data } = props;
  if (item.dataValues.code === 100 && incidentResolve.dataValues.hasVisa && incidentResolve.dataValues.allowToCreate) {
    props.subject = `Подписка: "Мой отдел". Заявка №${data.id}`;
    props.message = `Заявка №${data.id} получила изменения. http://srv-sdesk.c31.nccp.ru/myincidents/${data.id}`;

    sendMessage(props);
  }
}
function sendMailMyResponsible(props) {
  let { number, incidentResolve, data } = props;

  Users.findOne({
    where: { number },
    include: [
      {
        model: Position,
        include: [
          {
            model: Responsible,
            attributes: [
              'categoryId',
              'departmentId',
              'isArchive',
              'optionId',
              'positionId',
              'propertyId',
              'userNumber',
            ],
          },
        ],
      },
    ],
  }).then((userResolve) => {
    let { responsibles } = userResolve.dataValues.position;
    let isResponsible = false;

    responsibles.forEach(({ dataValues }) => {
      let responsible = dataValues;
      if (responsible.categoryId == incidentResolve.dataValues.categoryId) isResponsible = true;
      if (responsible.propertyId == incidentResolve.dataValues.propertyId) isResponsible = true;
      if (responsible.optionId == incidentResolve.dataValues.optionId) isResponsible = true;
      console.log('responsible', responsible);
    });

    if (isResponsible) {
      props.subject = `Подписка: "Моя ответственность". Заявка №${data.id}`;
      props.message = `Заявка №${data.id} получила изменения. http://srv-sdesk.c31.nccp.ru/myincidents/${data.id}`;
      sendMessage(props);
    }
  });
}
function sendMessage(props) {
  let { subject, message, number, userNumbersSended } = props;
  Axios.get('http://api.nccp-eng.ru/?method=mail.send', {
    params: {
      numbers: number,
      from: `ServiceDesk`,
      subject,
      text: `${message} Отвечать на это сообщение не нужно!`,
    },
  }).then((subscriptionResolve) => console.log(`Тема: ${subject}. Сообщение  ${message}  отправлено ${number}`));
  userNumbersSended.push(number);
}

sio.on('connection', (client) => {
  console.log(`${client.conn.id}:`);

  client.on('newIncident', (data) => {
    client.broadcast.emit(String(data.departmentId), data);
    console.log(String(data.departmentId), data);

    Incident.findOne({ where: { id: data.id } }).then((incidentResolve) => {
      let { currentResponsible, departmentId, userNumber } = incidentResolve.dataValues;

      Subscriptions.findAll({
        where: {
          [Op.or]: [{ currentResponsible }, { departmentId }, { userNumber }],
        },
      }).then((subscription) => {
        let userNumbersSended = [];

        subscription.forEach((item) => {
          let number = item.dataValues.userNumberSubscription;
          let wasUsers = !!~userNumbersSended.findIndex((elem) => elem === number);
          let message = `Вам поступила заявка №${data.id}. http://srv-sdesk.c31.nccp.ru/incident/${data.id}`;
          if (!wasUsers) setTimeout(sendMailMyResponsible({ number, incidentResolve, userNumbersSended, data }), 500);
          wasUsers = !!~userNumbersSended.findIndex((elem) => elem === number);
          if (!wasUsers)
            setTimeout(sendMailMyDepartment({ item, incidentResolve, userNumbersSended, number, data, message }), 500);
        });
      });
    });
  });

  client.on('incidentUpdate', (data) => {
    Incident.findOne({ where: { id: data.id } }).then((incidentResolve) => {
      let { currentResponsible, departmentId, userNumber } = incidentResolve.dataValues;
      console.log('incidentResolve', incidentResolve.dataValues);
      setTimeout(() => {
        currentResponsible
          ? client.broadcast.emit(`updateResponsible${currentResponsible}`, incidentResolve.dataValues)
          : client.broadcast.emit(`updateResponsibleDepartment${departmentId}`, incidentResolve.dataValues);

        client.broadcast.emit(`updateIncidentOwner${userNumber}`, incidentResolve.dataValues);
      }, 1000);

      Subscriptions.findAll({
        where: {
          [Op.or]: [{ currentResponsible }, { departmentId }, { userNumber }],
        },
      }).then((subscription) => {
        let userNumbersSended = [];

        subscription.forEach((item) => {
          let number = item.dataValues.userNumberSubscription;

          /** Сначала отправляем все подписки "Моя заявка" */
          let wasUsers = !!~userNumbersSended.findIndex((elem) => elem === number);
          if (!wasUsers && item.dataValues.code === 300) {
            let subject = `Подписка: "Моя заявка". Заявка №${data.id}`;
            let message = `Ваш заявка №${data.id} получила изменения. http://srv-sdesk.c31.nccp.ru/myincidents/${data.id}`;
            sendMessage({ subject, message, number, userNumbersSended, data });
          }
          /** Моя ответственность */
          wasUsers = !!~userNumbersSended.findIndex((elem) => elem === number);
          if (!wasUsers) setTimeout(sendMailMyResponsible({ number, incidentResolve, userNumbersSended, data }), 500);
          /** Мой отдел */
          wasUsers = !!~userNumbersSended.findIndex((elem) => elem === number);
          if (!wasUsers)
            setTimeout(sendMailMyDepartment({ item, incidentResolve, userNumbersSended, number, data }), 500);
        });
      });
    });
  });
});

const port = 8000;
server.listen(port, () => {
  console.log('WebSocket listening on PORT ', port);
});
