import express from 'express';
import passport from 'passport';
import authController from '../../controllers/authController';

const Router = express.Router();

// Setting up the passport middleware for each of the OAuth providers
const googleAuth = passport.authenticate('google', { session: false, scope: ['profile', 'email'] });

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// Routes that are triggered by the React client
Router.get('/google', addSocketIdtoSession, googleAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
Router.get('/google/callback', googleAuth, authController.google);

export default Router;

// ****** additional routes for other oAuth providers//

// const twitterAuth = passport.authenticate('twitter');
// const facebookAuth = passport.authenticate('facebook');
// const githubAuth = passport.authenticate('github');
// Router.get('/twitter', addSocketIdtoSession, twitterAuth);
// Router.get('/facebook', addSocketIdtoSession, facebookAuth);
// Router.get('/github', addSocketIdtoSession, githubAuth);
// Router.get('/twitter/callback', twitterAuth, authController.twitter);
// Router.get('/facebook/callback', facebookAuth, authController.facebook);
// Router.get('/github/callback', githubAuth, authController.github);
