import jwt from 'jsonwebtoken';
import User from '../models/user';
import { SECRET } from '../config/environment';

function createAndSendToken(user, res, message) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '6h' });
  return res.status(201).json({ user, message, token });
}

function login(req, res, next) {
  User.findOne({ email: req.body.email.toLowerCase() })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: `Unauthorised ${req.body.email}` });
      }
      // user validation succeeded
      return createAndSendToken(user, res, `Welcome back ${user.username}!`);
    })
    .catch(next);
}

// old register function without logging in.
// function register(req, res, next) {
//   User.create(req.body)
//     .then(user => res.status(201).json({ message: `Create a new user: ${user.username}`, user }))
//     .catch(next);
// }

// by sending a token on register the user will automagically be logged in!
function register(req, res, next) {
  User.create(req.body)
    .then(user => createAndSendToken(user, res, `Created, ${user.username}`))
    .catch(next);
}

function googleAuth(req, res) {
  console.log('googleAuth fired from withn the controller', req.user);
  const io = req.app.get('io');
  const user = {
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
  };
  io.in(req.session.socketId).emit('google', user);
}

export default {
  login,
  register,
  google: googleAuth
};
