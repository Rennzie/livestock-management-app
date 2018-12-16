import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import Router from './config/routes';

import errorHandler from './lib/errorHandler';
import { PORT, DB_URI } from './config/environment';

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(
  DB_URI,
  { useCreateIndex: true, useNewUrlParser: true }
);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', Router);

// app.use(express.static(path.join(__dirname, "client", "dist")))

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(`${__dirname}/client/build/index.html`)));
});
// app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Express is running on PORT ${PORT}`));

export default app;
