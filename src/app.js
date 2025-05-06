const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
require('dotenv').config({ path: __dirname + '/env/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const saveContactUsForm = require('./routes/saveContactUsForm');

const port = process.env.PORT || 3000;

const allowedOrigins = config.get('allowedOrigins');

// Configure CORS to allow only specific origins and require an Origin header
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(new Error('no_origin_header'));
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('cors_not_allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: false
}));

// Error response formatter
const formatErrorResponse = (status, code, message, details = null) => ({
  status,
  code,
  error: message,
  ...(details && { details })
});

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'no_origin_header':
      return res.status(403).json(
        formatErrorResponse('NOK', 403, 'Access denied: Requests must include a valid Origin header. Non-browser clients (e.g., Postman, curl) are not allowed.')
      );

    case 'cors_not_allowed':
      return res.status(403).json(
        formatErrorResponse('NOK', 403, 'CORS policy: This origin is not allowed to access the API.')
      );

    default:
      // Handle unexpected errors
      return res.status(500).json(
        formatErrorResponse('NOK', 500, 'Internal server error. Please try again later.', process.env.NODE_ENV === 'development' ? err.message : undefined)
      );
  }
});

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

app.use(express.json());

app.use('/api/saveContactUsForm', apiLimiter, saveContactUsForm);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
