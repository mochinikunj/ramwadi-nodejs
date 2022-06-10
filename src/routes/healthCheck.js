const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        status: 'OK',
        code: '200'
    });
});

module.exports = router;