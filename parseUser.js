module.exports = () => {
  const axios = require('axios');
  axios
    .get('http://api.nccp-eng.ru/', {
      params: {
        method: 'users.get',
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
