const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('healthCheck');
  res.status(200).send({ code: 200, status: 'OK' });
});

module.exports = router;
