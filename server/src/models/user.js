const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  firstName: String,
  surname: String,
  farmName: String,
  dateOfBirth: Date
});

// PLUGINS
// throw validation error when duplicate emails are created
userSchema.plugin(require('mongoose-unique-validator'));

// METHODS
// password validation
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// LIFECYCLE HOOKS
// hash a password if it is updated
userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    // check if the password is one of the things going to be modified
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
