import mongoose from 'mongoose';
import { DB_URI } from '../config/environment';

// Import all the models
import User from '../models/user';
import Farm from '../models/farm';
import Class from '../models/class';
import Bovine from '../models/bovine';

// Import all the mock data
import bovineData from './mockData/bovineData';
import userData from './mockData/userData';
import classesData from './mockData/classData';
import farmData from './mockData/farmData';

// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

mongoose.connect(
  DB_URI,
  { useCreateIndex: true, useNewUrlParser: true }
);

// Clear the data in the collection
User.collection.drop();
Farm.collection.drop();
Class.collection.drop();
Bovine.collection.drop();

User.create(userData)
  .then(users => console.log(`created ${users.length} new users`))
  .then(() => Farm.create(farmData))
  .then(farms => console.log(`created ${farms.length} new farms`))
  .then(() => Class.create(classesData))
  .then(classes => console.log(`created ${classes.length} new classes`))
  .then(() => Bovine.create(bovineData))
  .then(bovines => console.log(`created ${bovines.length} new bovines`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
