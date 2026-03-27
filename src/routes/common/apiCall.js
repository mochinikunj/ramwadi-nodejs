const axios = require('axios');

const getApiCall = (endpoint, headers = {}) => {
  console.log('Api Call:', { method: 'GET', endpoint, headers });

  return new Promise((resolve, reject) => {
    axios
      .get(endpoint, { headers })
      .then((res) => {
        console.log('Success api call');
        resolve(res);
      })
      .catch((err) => {
        console.log('Error in api call');
        reject(err);
      });
  });
};

const postApiCall = (endpoint, req, headers = {}) => {
  console.log('Api Call:', { method: 'POST', endpoint, req, headers });

  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, req, { headers })
      .then((res) => {
        console.log('Success api call');
        resolve(res);
      })
      .catch((err) => {
        console.log('Error in api call');
        reject(err);
      });
  });
};

module.exports = {
  getApiCall,
  postApiCall,
};
