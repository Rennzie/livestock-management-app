const mongoose = require('mongoose');
// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { dbUri } = require('../config/environment');
mongoose.connect(dbUri);

// Import all the models

const Bovine = require('../models/bovine');
const Herd = require('../models/herd');

// date as unix 10/10/2017 DD/MM/YYY
const oneYearAgo = 1507564800;

// date as unix 11/10/2018 DD/MM/YYYY
const today = 1539213325;

const bovineIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708', '5b91752666708bc8b1622709',
  '5b91752666708bc8b1622710', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c', '5b91752666708bc8b162271d'
];

const herdIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806'
];

//create two herds,
//  1) cow herd with 5 animals
//  2) weaners herd with 5 animals

const bovineData = [
  // cows herd
  {
    _id: bovineIds[0],
    birthDate: oneYearAgo,
    herd: herdIds[0],
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 400, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[1],
    birthDate: oneYearAgo,
    herd: herdIds[0],
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 400, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[2],
    birthDate: oneYearAgo,
    herd: herdIds[0],
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 400, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[3],
    birthDate: oneYearAgo,
    herd: herdIds[0],
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 400, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[4],
    birthDate: oneYearAgo,
    herd: herdIds[0],
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: false
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 400, unit: 'kgs'}
    ]
  },

  // weaners herd
  {
    _id: bovineIds[5],
    birthDate: today,
    herd: herdIds[1],
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 300, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[6],
    birthDate: today,
    herd: herdIds[1],
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 300, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[7],
    birthDate: today,
    herd: herdIds[1],
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 300, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[8],
    birthDate: today,
    herd: herdIds[1],
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 300, unit: 'kgs'}
    ]
  }, {
    _id: bovineIds[9],
    birthDate: today,
    herd: herdIds[1],
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 300, unit: 'kgs'}
    ]
  }
];

const herdData = [
  {
    _id: herdIds[0],
    name: 'Hereford Breeding Group A',
    category: 'cows'
  },{
    _id: herdIds[1],
    name: 'Hereford Fattening Group A',
    category: 'pasturelot'
  }
];

Bovine.collection.drop();
Herd.collection.drop();

Bovine.create(bovineData)
  .then(bovines => console.log(`created ${bovines.length} new bovines`))
  .then(() => Herd.create(herdData))
  .then(herds => console.log(`created ${herds.length} new herds`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
