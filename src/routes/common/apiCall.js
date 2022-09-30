const axios = require('axios');

const getApiCall = (endpoint, req) => {
    console.log('Api Call:', { method: 'GET', endpoint, req });

    return new Promise((resolve, reject) => {
        axios.post(endpoint, req).then((res) => {
            console.log('Success api call');
            resolve(res);
        }).catch((err) => {
            console.log('Error in api call');
            reject(err);
        });
    });
};

const postApiCall = (endpoint, req) => {
    console.log('Api Call:', { method: 'POST', endpoint, req });

    return new Promise((resolve, reject) => {
        axios.post(endpoint, req).then((res) => {
            console.log('Success api call');
            resolve(res);
        }).catch((err) => {
            console.log('Error in api call');
            reject(err);
        });
    });
};

module.exports = {
    getApiCall,
    postApiCall
};