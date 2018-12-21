// lib/auth.router.js

import express from 'express';
import passport from 'passport';
import authController from '../../controllers/authController';

const Router = express.Router();

// Setting up the passport middleware for each of the OAuth providers
// const twitterAuth = passport.authenticate('twitter');
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
// const facebookAuth = passport.authenticate('facebook');
// const githubAuth = passport.authenticate('github');

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// Routes that are triggered by the React client
// Router.get('/twitter', addSocketIdtoSession, twitterAuth);

Router.get('/google', addSocketIdtoSession, googleAuth);

// Router.get('/facebook', addSocketIdtoSession, facebookAuth);
// Router.get('/github', addSocketIdtoSession, githubAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
// Router.get('/twitter/callback', twitterAuth, authController.twitter);

Router.get('/google/callback', googleAuth, authController.google);

// Router.get('/facebook/callback', facebookAuth, authController.facebook);
// Router.get('/github/callback', githubAuth, authController.github);

export default Router;
