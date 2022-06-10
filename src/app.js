const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
const express = require('express');
const app = express();
const cors = require('cors');
const healthCheck = require('./routes/healthCheck');
const reCaptchValidate = require('./routes/reCaptchaValidate');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/healthCheck', healthCheck);
app.use('/api/reCaptchValidate', reCaptchValidate);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});