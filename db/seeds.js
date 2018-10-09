const mongoose = require('mongoose');
// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { dbUri } = require('../config/environment');
mongoose.connect(dbUri);

// Import all the models

const Bovine = require('../models/bovine');

const bovineIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const userIds = [
  '5b91752666708bc8b1622709', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c'
];

const bovineData = [
  {
    _id: bovineIds[0],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    category: 'calf',
    breed: 'Hereford',
    weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
  }, {
    _id: bovineIds[1],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    category: 'calf',
    breed: 'Hereford',
    weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
  },
  {
    _id: bovineIds[2],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    category: 'calf',
    breed: 'Hereford',
    weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
  }, {
    _id: bovineIds[3],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    category: 'calf',
    breed: 'Hereford',
    weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
  }
];

Bovine.collection.drop();

Bovine.create(bovineData)
  .then(bovines => console.log(`created ${bovines.length} new bovines`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());


// NOTE: dont need seeds to test with;
