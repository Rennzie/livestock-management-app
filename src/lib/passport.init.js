// lib/passport.init.js

// const { Strategy: TwitterStrategy } = require('passport-twitter');
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passport from 'passport';

import { GOOGLE_CONFIG } from '../config/config';

// const { Strategy: FacebookStrategy } = require('passport-facebook');
// const { Strategy: GithubStrategy } = require('passport-github');
// const {
//   TWITTER_CONFIG,
//   GOOGLE_CONFIG,
//   FACEBOOK_CONFIG,
//   GITHUB_CONFIG
// } = require('../config/environment');

export default () => {
  // Allowing passport to sesrialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // The function that is called when an OAuth provider sends back user
  // information.  Normally, you would save the user to the database
  // in a callback that was customized for each provider.
  const callback = (accessToken, refreshToken, profile, cb) => {
    console.log('profile from google is ', profile);
    return cb(null, profile);
  };

  // Adding each OAuth provider's strategy to passport
  // passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  // passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
  // passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
};
