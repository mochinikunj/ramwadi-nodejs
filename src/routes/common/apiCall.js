const axios = require('axios');

const getApiCall = () => {

};

const postApiCall = (endpoint, req) => {
    console.log('Api Call:', { endpoint, req });

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