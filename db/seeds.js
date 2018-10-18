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
  '5b91752666708bc8b1622710', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c', '5b91752666708bc8b162271d',
  '5b91752666708bc8b162271e', '5b91752666708bc8b162271f', '5b91752666708bc8b1622720', '5b91752666708bc8b1622721', '5b91752666708bc8b1622722'
];

const herdIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806'
];

//create two herds,
//  1) cow herd with 5 cows and 3 calfs
//  2) weaners herd with 5 animals

const bovineData = [
  // cows herd
  {
    _id: bovineIds[0],
    identifier: 'RSA-PAL-2014-01',
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
    identifier: 'RSA-PAL-2014-02',
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
    identifier: 'RSA-PAL-2014-03',
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
    identifier: 'RSA-PAL-2014-04',
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
    identifier: 'RSA-PAL-2014-05',
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
  },{
    _id: bovineIds[10],
    identifier: 'RSA-PAL-2018-06',
    birthDate: today,
    herd: herdIds[0],
    category: 'calf',
    breed: 'Hereford',
    weights: [ {timing: 'birth', weight: 250, unit: 'kgs'} ]
  }, {
    _id: bovineIds[11],
    identifier: 'RSA-PAL-2018-07',
    birthDate: today,
    herd: herdIds[0],
    category: 'calf',
    breed: 'Hereford',
    weights: [ {timing: 'birth', weight: 250, unit: 'kgs'} ]
  }, {
    _id: bovineIds[12],
    identifier: 'RSA-PAL-2018-08',
    birthDate: today,
    herd: herdIds[0],
    category: 'calf',
    breed: 'Hereford',
    weights: [ {timing: 'birth', weight: 250, unit: 'kgs'} ]
  },

  // weaners herd
  {
    _id: bovineIds[5],
    identifier: 'RSA-PAL-2017-09',
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
    identifier: 'RSA-PAL-2017-10',
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
    identifier: 'RSA-PAL-2017-11',
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
    identifier: 'RSA-PAL-2017-12',
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
    identifier: 'RSA-PAL-2017-13',
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
