import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import router from './apis/routes/index.js';

const app = express();
const httpServer = createServer(app);

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Headers': 'XMLHttpRequest,Content-Type',
    'Access-Control-Allow-Methods': 'POST,GET',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Private-Network': true,
  });
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.get('/api/healthChecker', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World !',
  });
});

// UnKnown Routes
app.all('*', (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
  err.status = err.status || 400;
  // err.statusCode = err.statusCode || 500;
  console.log(err.message);

  res.status(err.status).json({
    status: err.status,
    msg: err.message,
  });
});

export default httpServer;
