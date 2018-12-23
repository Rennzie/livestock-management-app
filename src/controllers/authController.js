import jwt from 'jsonwebtoken';
import User from '../models/user';
import { SECRET } from '../config/environment';

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '6h' });
  return token;
}

function createAndSendToken(user, res, message) {
  const token = generateToken(user);
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

// by sending a token on register the user will automagically be logged in!
function register(req, res, next) {
  User.create(req.body)
    .then(user => createAndSendToken(user, res, `Created, ${user.username}`))
    .catch(next);
}

/**
 *  Callback fired at the end of passport auth protocal for google
 *  Generates a token with the user id and emit it via the socket to the
 *  login page on the front end
 * */
function googleAuth(req) {
  const io = req.app.get('io');
  const token = generateToken(req.user);
  io.in(req.session.socketId).emit('google', token);
}

export default {
  login,
  register,
  google: googleAuth
};
