const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
const app = express();

require('dotenv').config();
const api = require('./api/ppk');
const auth = require('./auth/index');
const middleware = require('./auth/middleware');
app.use(volleyball);
app.use(cors({
  origin:'http://localhost:3000'
}))
app.use(middleware.checkToken);
app.use(express.json());
app.use('/auth',auth);
app.use('/api',middleware.isLoggedIn,api);
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello World! 🌈✨🦄'
  });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});

