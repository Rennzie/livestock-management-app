const User = require('../models/user');

function register( req, res, next ){
  User
    .create(req.body)
    .then(user => res.status(201).json({message: `Create a new user: ${user.username}`, user}))
    .catch(next);
}

module.exports = {
  // login,
  register
};
