// async function mail() {
//   const nodemailer = require('nodemailer');

//   let testEmailAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     host: 'mail.c31.nccp.ru',
//     port: 110,
//     secure: false,
//     auth: {
//       user: 'vds81251@c31.nccp.ru',
//       pass: 'Dverevin&27708817',
//     },
//   });

//   let result = await transporter.sendMail({
//     from: 'vds81251@c31.nccp.ru',
//     to: 'vds81251@c31.nccp.ru',
//     subject: 'Message from Node js',
//     text: 'This message was sent from Node js server.',
//     html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
//   });

//   console.log(result);
// }
// mail();

const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
  silent: false,
  devPort: 110, // Default: False
  devHost: 'mail.c31.nccp.ru', // Default: localhost
  smtpPort: 110, // Default: 25
  smtpHost: 'mail.c31.nccp.ru', // Default: -1 - extra smtp host after resolveMX
});
sendmail(
  {
    from: 'vds81251@c31.nccp.ru',
    to: 'vds81251@c31.nccp.ru',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  },
  function (err, reply) {
    console.log('err', err);
    console.log('reply', reply);
  },
);
