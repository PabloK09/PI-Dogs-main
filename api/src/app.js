const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser'); //deprecated
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')

require('./db.js');
const server = express();

server.name = 'API';

server.use(cors())
server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
//set headers (cors)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


server.use('/', routes);

// Error catching endware. Sirve para manipular errores
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});


module.exports = server;
