import mongoose from 'mongoose';
import { DB_URI } from '../config/environment';

// Import all the models
import User from '../models/user';
import Farm from '../models/farm';
import Category from '../models/category';
import Bovine from '../models/bovine';

// Import all the mock data
import bovineData from './mockData/bovineData';
import userData from './mockData/userData';
// import categoriesData from './mockData/categoryData';
import farmData from './mockData/farmData';

// Use bluebird to make promises easier
mongoose.Promise = require('bluebird');

mongoose.connect(
  DB_URI,
  { useCreateIndex: true, useNewUrlParser: true }
);

// Clear the data in the collection
User.collection.drop();
Farm.collection.drop();
Category.collection.drop();
Bovine.collection.drop();

User.create(userData)
  .then(users => console.log(`created ${users.length} new users`))
  .then(() => Farm.create(farmData))
  .then(farms => console.log(`created ${farms.length} new farms`))
  // .then(() => Category.create(categoriesData))
  // .then(categories => console.log(`created ${categories.length} new categories`))
  .then(() => Bovine.create(bovineData))
  .then(bovines => console.log(`created ${bovines.length} new bovines`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
