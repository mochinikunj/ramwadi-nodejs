const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
require('dotenv').config({ path: __dirname + '/env/.env' });
const express = require('express');
const app = express();
const cors = require('cors');

require('./database/connection');
// require('./database/createDatabase');
// require('./database/createTables');
const healthCheck = require('./routes/healthCheck');
// const reCaptchValidate = require('./routes/reCaptchaValidate');
const saveContactUsForm = require('./routes/saveContactUsForm');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/healthCheck', healthCheck);
// app.use('/api/reCaptchValidate', reCaptchValidate);
app.use('/api/saveContactUsForm', saveContactUsForm);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});