const mongoose = require('mongoose');
// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

// Import all the models

const Animal = require('../models/animal');


const animalDate = [
  {
    type: 'cow',
    methodOfRemoval: 'sale',
    saleRevenue: 10000,
    revenueCurrency: 'ZAR',
    saleWeight: 400,
    weightUnit: 'kgs'
  },{
    type: 'cow',
    methodOfRemoval: 'sale',
    saleRevenue: 7000,
    revenueCurrency: 'ZAR',
    saleWeight: 300,
    weightUnit: 'kgs',
    weights: [{weight: 500, unit: 'kgs'}]
  }
];


// NOTE: dont need seeds to test with;
