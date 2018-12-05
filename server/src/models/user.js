import { Schema, model } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    firstName: String,
    surname: String,
    dateOfBirth: Date
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// --- PLUGINS ---//
// throw validation error when duplicate emails are created
UserSchema.plugin(require('mongoose-unique-validator'));

// --- VIRTUALS ---//
UserSchema.virtual('farms', {
  ref: 'Farm',
  localField: '_id',
  foreignField: 'farmOwner'
});

// --- METHODS ---//
// password validation
UserSchema.methods.validatePassword = function(password) {
  return compareSync(password, this.password);
};

// --- LIFECYCLE HOOKS ---//
// hash a password if it is updated
UserSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    // check if the password is one of the things going to be modified
    this.password = hashSync(this.password, 8);
  }
  next();
});

export default model('User', UserSchema);
