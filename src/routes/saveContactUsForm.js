const express = require('express');
const router = express.Router();

const storeContactUsDetails = require('../database/store/storeContactUsDetails');
const verifyReCaptcha = require('./reCaptchaValidate');

router.post('/', async (req, res) => {
    try {
        const captchaResponse = await verifyReCaptcha(req);
        if (!(captchaResponse && captchaResponse.success)) {
            throw new Error();
        }

        const response = await storeContactUsDetails(req.body);
        console.log('ContactUs form storage response: ', response);
        if (!(response && response.code === 200 && response.status === 'OK')) {
            throw new Error();
        }

        res.status(200).send({ code: 200, status: 'OK' });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;