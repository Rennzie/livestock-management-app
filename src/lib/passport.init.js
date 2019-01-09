import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passport from 'passport';

import GOOGLE_CONFIG from '../config/config';
import User from '../models/user';

export default () => {
  /**
   *     The function that is called when an OAuth provider sends back user
   *     information.  Normally, you would save the user to the database
   *     in a callback that was customized for each provider.
   */
  const callback = (req, accessToken, refreshToken, profile, next) => {
    const email = profile.emails[0].value;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          // Creates a new user if they do not have an account
          const newUser = User.create({
            email,
            firstName: profile.name.givenName,
            surname: profile.name.familyName,
            profilePic: profile.photos[0].value
          });
          return next(null, newUser);
        }
        /**
         *  Puts the user profile onto the req obj and calls next in line
         *  in this case it is the authController.google function
         */
        return next(null, user);
      })
      .catch(next);
  };

  // Adding each OAuth provider's strategy to passport
  if (GOOGLE_CONFIG.clientID) {
    passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  }
};

// ****** additional routes for other oAuth providers//

// passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
// passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
// passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
// const { Strategy: FacebookStrategy } = require('passport-facebook');
// const { Strategy: TwitterStrategy } = require('passport-twitter');
// const { Strategy: GithubStrategy } = require('passport-github');
// const {
//   TWITTER_CONFIG,
//   GOOGLE_CONFIG,
//   FACEBOOK_CONFIG,
//   GITHUB_CONFIG
// } = require('../config/environment');
