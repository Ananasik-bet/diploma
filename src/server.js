const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { logRequest } = require('./middlewares/requestLogger.js');
const router = express.Router();
const { checkBannedIp } = require('./middlewares/checkIP.js')


// Load environment variables from .env file
dotenv.config();

const app = express();

// Use helmet middleware for enhanced security
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({
  limit: '10mb',
  extended: true,
}));
app.use(express.json({
  limit: '20mb',
}));

// Use morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Use body-parser for handling request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check if IP banned
app.use((req, res, next) => {
  checkBannedIp(req, res, next);
});

// Middleware to log and save all incoming requests
app.use((req, res, next) => {
  logRequest(req);
  next();
});

// Define the main router for the application using index.js
app.use('/api', router);
require('./routes')(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
