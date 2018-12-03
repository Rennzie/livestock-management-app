const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Router = require('./config/routes');

const errorHandler = require('./lib/errorHandler');

const { PORT, DB_URI } = require('./config/environment');

mongoose.Promise = require('bluebird');

mongoose.connect(
  DB_URI,
  { useCreateIndex: true, useNewUrlParser: true }
);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', Router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Express is running on PORT ${PORT}`));

module.exports = app;
