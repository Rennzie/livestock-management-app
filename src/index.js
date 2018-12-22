import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import socketio from 'socket.io';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import http from 'http';
import dotenv from 'dotenv';
import Router from './config/routes';
import passportInit from './lib/passport.init';
import errorHandler from './lib/errorHandler';
import authRouter from './config/endpoints/auth.router';
import { PORT, DB_URI, CLIENT_ORIGIN } from './config/environment';

dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose.Promise = require('bluebird');

mongoose.connect(
  DB_URI,
  { useCreateIndex: true, useNewUrlParser: true }
);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(passport.initialize());
passportInit();

// Accept requests from the client
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(server);
app.set('io', io);

app.use('/', authRouter);
app.use('/api', Router);

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(expressStaticGzip(path.join(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.use(errorHandler);

server.listen(PORT, () => console.log(`Express is running on PORT ${PORT}`));

export default app;
