const config = require('config');
const express = require('express');
const router = express.Router();
const { postApiCall } = require('./common/apiCall');

router.post('/', async (req, res) => {
    const reCaptchaEndpoint = config.get('reCaptcha.apiUrl');
    const reCaptchaSecretKey = process.env.RECAPTCHA_SECRETKEY;
    console.log(reCaptchaSecretKey);
    const endpoint = `${reCaptchaEndpoint}?secret=${reCaptchaSecretKey}&response=${req.body.recaptcha}&remoteip=${req.socket.remoteAddress}`;

    try {
        const response = await postApiCall(endpoint);

        console.log('reCaptcha response:', response.data);
        if (!(response && response.data && response.data.success)) {
            throw new Error();   
        }

        res.send({
            status: 'OK',
            code: '200',
            success: response.data.success
        });
    } catch (err) {
        console.log('Error in reCaptcha response');
        
        res.status(400).send({
            status: 'NOK',
            code: '400',
            error: {
                message: 'Error in reCaptcha response',
                error: err
            }
        });
    }
});

module.exports = router;