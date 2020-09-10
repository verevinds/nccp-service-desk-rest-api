const cronJob = require('cron').CronJob;
const syncNCCP = require('./app/syncNCCP');

console.log('cron');
const cron = new cronJob('0 0 10 */1 * *', () => {
  console.log('cron start');

  syncNCCP(); //S
});

cron.start();
