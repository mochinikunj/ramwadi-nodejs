const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
require('dotenv').config({ path: __dirname + '/env/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const saveContactUsForm = require('./routes/saveContactUsForm');

const port = process.env.PORT || 3000;

const apiLimiter = rateLimit({
  windowMs: process.env.windowMs || (10 * 60 * 1000),
  limit: process.env.limit || 2,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 'NOK',
    code: 429,
    error: 'Too many requests, please try again later.'
  },
  handler: (req, res) => {
    res.status(429).json({
      status: 'NOK',
      code: 429,
      error: 'Too many requests, please try again later.'
    });
  },
  store: new rateLimit.MemoryStore() // Explicitly use in-memory store
});

app.use(cors());
app.use(express.json());

app.use('/api/saveContactUsForm', apiLimiter, saveContactUsForm);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
