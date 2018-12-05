import jwt from 'jsonwebtoken';
import User from '../models/user';
import { SECRET } from '../config/environment';

function createAndSendToken(user, res, message) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '6h' });
  return res.status(201).json({ message, token });
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
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
function register(req, res, next) {
  User.create(req.body)
    .then(user => res.status(201).json({ message: `Create a new user: ${user.username}`, user }))
    .catch(next);
}

// by sending a token on register the user will automagically be logged in!
// function register(req, res, next) {
//   User.create(req.body)
//     .then(user => createAndSendToken(user, res, `Created, ${user.username}`))
//     .catch(next);
// }

export default {
  login,
  register
};
