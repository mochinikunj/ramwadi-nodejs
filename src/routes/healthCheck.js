const express = require('express');
const router = express.Router();

const healthCheckDrupal = require('./common/healthCheckDrupal');

router.get('/', async (_, res) => {
  console.log('healthCheck');
  try {
    const response = await healthCheckDrupal();
    console.log('healthCheck: ', response);
    if (!(response && response.code === 200 && response.status === 'OK')) {
      throw new Error();
    }

    res.json({ code: 200, status: 'OK', message: 'Health check passed.' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
