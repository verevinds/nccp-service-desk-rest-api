const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
var fs = require('fs');
const db = require('./app/models');
const { default: Axios } = require('axios');
const Incident = db.incidents;
const Subscriptions = db.subscriptions;
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

sio.on('connection', (client) => {
  console.log(`${client.conn.id}:`);

  client.on('newIncident', (data) => {
    client.broadcast.emit(String(data.departmentId), data);
    console.log(String(data.departmentId), data);

    // Incident.findOne({ where: { id: data.id } }).then((res) => {
    //   let { currentResponsible, departmentId, userNumber } = res.dataValues;

    //   Subscriptions.findAll({
    //     where: {
    //       [Op.or]: [{ currentResponsible }, { departmentId }, { userNumber }],
    //     },
    //   }).then((subscription) => {
    //     let subscriptions = subscription.map((item) => {
    //       let { userNumberSubscription, name, code } = item.dataValues;

    //       return userNumberSubscription;
    //     });
    //     let mailList = Array.from(new Set(subscriptions));

    //     let filterMailList = mailList.filter((item) => item !== data.userNumber);
    //     filterMailList.forEach((item) => {
    //       Axios.get('http://api.nccp-eng.ru/?method=mail.send', {
    //         params: {
    //           numbers: item,
    //           from: `ServiceDesk`,
    //           subject: `Заявка №${data.id}`,
    //           text: `Поступила новая заявка №${data.id} http://srv-sdesk.c31.nccp.ru/
    //             Отвечать на это сообщение не нужно!`,
    //         },
    //       }).then((res) => console.log(`Сообщение отправлено ${item}`));
    //     });
    //   });
    // });
  });

  client.on('incidentUpdate', (data) => {
    Incident.findOne({ where: { id: data.id } }).then((incidentResolve) => {
      let { currentResponsible, departmentId, userNumber } = incidentResolve.dataValues;
      console.log('Пришли данные по инциденту: ', { currentResponsible, departmentId, userNumber });
      currentResponsible
        ? client.broadcast.emit(`updateResponsible${currentResponsible}`, incidentResolve.dataValues)
        : client.broadcast.emit(`updateResponsibleDepartment${departmentId}`, incidentResolve.dataValues);

      client.broadcast.emit(`updateIncidentOwner${userNumber}`, incidentResolve.dataValues);

      // currentResponsible
      //   ? console.log(`updateResponsible${currentResponsible}`, res.dataValues)
      //   : console.log(`updateResponsibleDepartment${departmentId}`, res.dataValues);

      // console.log(`updateIncidentOwner${userNumber}`, res.dataValues);

      Subscriptions.findAll({
        where: {
          [Op.or]: [{ currentResponsible }, { departmentId }, { userNumber }],
        },
      }).then((subscription) => {
        let userNumbersSended = [];
        /** Сначала отправляем все подписки "Мой инцидент" */
        subscription.forEach((item) => {
          function sendMessage(subject, message, number) {
            Axios.get('http://api.nccp-eng.ru/?method=mail.send', {
              params: {
                numbers,
                from: `ServiceDesk`,
                subject,
                text: `${message} Отвечать на это сообщение не нужно!`,
              },
            }).then((subscriptionResolve) =>
              console.log(`Сообщение отправлено ${item.dataValues.userNumberSubscription}`),
            );
            console.log('subject', subject);
            console.log('message', message);
            userNumbersSended.push(item.dataValues.userNumberSubscription);
          }
          console.log('subscription', item.dataValues);
          let wasUsers = !!~userNumbersSended.findIndex((elem) => elem === item.dataValues.userNumberSubscription);
          let number = item.dataValues.userNumberSubscription;

          if (!wasUsers && item.dataValues.code === 300) {
            let subject = `Подписка: "Моя заявка". Заявка №${data.id}`;
            let message = `Ваш инцидент №${data.id} получил изменения. http://srv-sdesk.c31.nccp.ru/myincidents/${data.id}`;
            sendMessage(subject, message, number);
          }
          if (!wasUsers && item.dataValues.code === 100) {
            let subject = `Подписка: "Мои отдел". Заявка №${data.id}`;
            let message = `Ваш инцидент №${data.id} получил изменения. http://srv-sdesk.c31.nccp.ru/incident/${data.id}`;

            console.log('incidentResolve', incidentResolve.dataValues);
            sendMessage(subject, message, number);
          }
          console.log('wasUsers', wasUsers);
        });
        console.log('userNumbersSended', userNumbersSended);

        // let subscriptions = subscription.map((item) => {
        //   let { userNumberSubscription, name, code } = item.dataValues;
        //   return userNumberSubscription;
        // });
        // let mailList = Array.from(new Set(subscriptions));
        // let params = '';
        // let filterMailList = mailList.filter((item) => item !== data.userNumber);
        // filterMailList.forEach((item) => {
        //   console.log('Отправленно', item);
        //   Axios.get('http://api.nccp-eng.ru/?method=mail.send', {
        //     params: {
        //       numbers: item,
        //       from: `ServiceDesk`,
        //       subject: `Заявка №${data.id}`,
        //       text: `Поступили изменения по заявке №${data.id} http://srv-sdesk.c31.nccp.ru/${params}
        //         Отвечать на это сообщение не нужно!`,
        //     },
        //   }).then((res) => console.log(`Сообщение отправлено ${item}`));
        // });
      });
    });
  });
});

const port = 8000;
server.listen(port, () => {
  console.log('WebSocket listening on PORT ', port);
});
