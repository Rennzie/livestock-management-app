const mongoose = require('mongoose');
// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { dbUri } = require('../config/environment');
mongoose.connect(dbUri);

// Import all the models

const Animal = require('../models/animal');

const animalIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const userIds = [
  '5b91752666708bc8b1622709', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c'
];

const animalData = [
  {
    _id: animalIds[0],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    type: 'cow',
    owners: [ userIds[0] ],
    weights: [{weight: 250, unit: 'kgs'}]
  }, {
    _id: animalIds[1],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    type: 'cow',
    owners: [ userIds[1] ],
    weights: [{weight: 250, unit: 'kgs'}]
  },
  {
    _id: animalIds[2],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    type: 'cow',
    owners: [ userIds[2] ],
    weights: [{weight: 250, unit: 'kgs'}]
  }, {
    _id: animalIds[3],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    type: 'cow',
    owners: [ userIds[3] ],
    weights: [{weight: 250, unit: 'kgs'}]
  }
];

Animal.collection.drop();

Animal.create(animalData)
  .then(animals => console.log(`created ${animals.length} new animals`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());


// NOTE: dont need seeds to test with;
