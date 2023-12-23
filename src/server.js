import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { createRequestLogTable, logRequest } from './middlewares/requestLogger.js';
import router from './routes/index.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use helmet middleware for enhanced security
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Use morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Use body-parser for handling request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the main router for the application using index.js
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Synchronize Sequelize models with the database
createRequestLogTable();

// Middleware to log and save all incoming requests
app.use((req, res, next) => {
  logRequest(req);
  next();
});

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
