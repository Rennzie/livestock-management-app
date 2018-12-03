const mongoose = require('mongoose');
const moment = require('moment');

// User bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { DB_URI } = require('../config/environment');

mongoose.connect(
  DB_URI,
  { useCreateIndex: true, useNewUrlParser: true }
);

// Import all the models

const Bovine = require('../models/bovine');
const Class = require('../models/class');
const User = require('../models/user');

// date as unix 10/10/2017 DD/MM/YYY
const oneYearAgo = 1507564800;

// date as unix 11/10/2018 DD/MM/YYYY
const today = 1539213325;

const bovineIds = [
  '5b91752666708bc8b1622705',
  '5b91752666708bc8b1622706',
  '5b91752666708bc8b1622707',
  '5b91752666708bc8b1622708',
  '5b91752666708bc8b1622709',
  '5b91752666708bc8b1622710',
  '5b91752666708bc8b162271a',
  '5b91752666708bc8b162271b',
  '5b91752666708bc8b162271c',
  '5b91752666708bc8b162271d',
  '5b91752666708bc8b162271e',
  '5b91752666708bc8b162271f',
  '5b91752666708bc8b1622720',
  '5b91752666708bc8b1622721',
  '5b91752666708bc8b1622722'
];

const classIds = [
  '5b91752666708bc8b1622821',
  '5b91752666708bc8b1622806',
  '5b91752666708bc8b1622807',
  '5b91752666708bc8b1622808'
];

const userIds = [
  '5b91752666718bc8b1632705',
  '5b91752666718bc8b1632706',
  '5b91752666718bc8b1632707',
  '5b91752666718bc8b1632708'
];

const userData = [
  {
    _id: userIds[0],
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    firstName: 'Sean',
    surname: 'Rennie',
    dateOfBirth: moment().set({ year: 1989, month: 9, date: 30 }),
    farmName: 'Palmiet'
  }
];

const bovineData = [
  // cows herd
  {
    _id: bovineIds[0],
    identifier: 'RSA-PAL-2014-01',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[1],
    identifier: 'RSA-PAL-2014-02',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[2],
    identifier: 'RSA-PAL-2014-03',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[3],
    identifier: 'RSA-PAL-2014-04',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[4],
    identifier: 'RSA-PAL-2014-05',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: false
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[10],
    identifier: 'RSA-PAL-2018-06',
    birthDate: today,
    category: 'calf',
    breed: 'Hereford',
    weights: [{ timing: 'birth', weight: 250, unit: 'kgs' }]
  },
  {
    _id: bovineIds[11],
    identifier: 'RSA-PAL-2018-07',
    birthDate: today,
    category: 'calf',
    breed: 'Hereford',
    weights: [{ timing: 'birth', weight: 250, unit: 'kgs' }]
  },
  {
    _id: bovineIds[12],
    identifier: 'RSA-PAL-2018-08',
    birthDate: today,
    category: 'calf',
    breed: 'Hereford',
    weights: [{ timing: 'birth', weight: 250, unit: 'kgs' }]
  },

  // weaners herd
  {
    _id: bovineIds[5],
    identifier: 'RSA-PAL-2017-09',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[6],
    identifier: 'RSA-PAL-2017-10',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[7],
    identifier: 'RSA-PAL-2017-11',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[8],
    identifier: 'RSA-PAL-2017-12',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[9],
    identifier: 'RSA-PAL-2017-13',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  }
];

const classesData = [
  {
    _id: classIds[0],
    name: 'Breeding Cows',
    class: 'cows',
    currentMonthDetail: {
      openingTotal: 0,
      period: 'Oct-2018',
      changes: {
        add: 100,
        death: -2,
        sale: -10
      },
      closingTotal: 111
    },
    currentMonthChanges: [
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 1 }),
        reasonForChange: 'add',
        animalsMoved: 50
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 7 }),
        reasonForChange: 'theft',
        animalsMoved: -2
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 10 }),
        reasonForChange: 'sale',
        animalsMoved: -10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 12 }),
        reasonForChange: 'add',
        animalsMoved: 10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 15 }),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ],
    changesArchive: {
      'Oct-2018': [
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 1 }),
          reasonForChange: 'add',
          animalsMoved: 100
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 10 }),
          reasonForChange: 'sale',
          animalsMoved: -10
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 20 }),
          reasonForChange: 'death',
          animalsMoved: -2
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 28 }),
          reasonForChange: 'add',
          animalsMoved: 23
        }
      ]
    }
  },
  {
    _id: classIds[1],
    name: 'Old Heifers',
    class: 'heifers-2-3',
    currentMonthDetail: {
      openingTotal: 0,
      period: 'Oct-2018',
      changes: {
        add: 100,
        death: -2,
        sale: -10
      },
      closingTotal: 111
    },
    currentMonthChanges: [
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 1 }),
        reasonForChange: 'add',
        animalsMoved: 50
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 7 }),
        reasonForChange: 'theft',
        animalsMoved: -2
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 10 }),
        reasonForChange: 'sale',
        animalsMoved: -10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 12 }),
        reasonForChange: 'add',
        animalsMoved: 10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 15 }),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ],
    changesArchive: {
      'Oct-2018': [
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 1 }),
          reasonForChange: 'add',
          animalsMoved: 100
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 10 }),
          reasonForChange: 'sale',
          animalsMoved: -10
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 20 }),
          reasonForChange: 'death',
          animalsMoved: -2
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 28 }),
          reasonForChange: 'add',
          animalsMoved: 23
        }
      ]
    }
  },
  {
    _id: classIds[2],
    name: 'Young Heifers',
    class: 'heifers-1-2',
    currentMonthDetail: {
      openingTotal: 0,
      period: 'Oct-2018',
      changes: {
        add: 100,
        death: -2,
        sale: -10
      },
      closingTotal: 111
    },
    currentMonthChanges: [
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 1 }),
        reasonForChange: 'add',
        animalsMoved: 50
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 7 }),
        reasonForChange: 'theft',
        animalsMoved: -2
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 10 }),
        reasonForChange: 'sale',
        animalsMoved: -10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 12 }),
        reasonForChange: 'add',
        animalsMoved: 10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 15 }),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ],
    changesArchive: {
      'Oct-2018': [
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 1 }),
          reasonForChange: 'add',
          animalsMoved: 100
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 10 }),
          reasonForChange: 'sale',
          animalsMoved: -10
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 20 }),
          reasonForChange: 'death',
          animalsMoved: -2
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 28 }),
          reasonForChange: 'add',
          animalsMoved: 23
        }
      ]
    }
  },
  {
    _id: classIds[3],
    name: 'Fattening Group A',
    class: 'oxen',
    currentMonthDetail: {
      openingTotal: 0,
      period: 'Oct-2018',
      changes: {
        add: 100,
        death: -2,
        sale: -10
      },
      closingTotal: 111
    },
    currentMonthChanges: [
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 1 }),
        reasonForChange: 'add',
        animalsMoved: 50
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 7 }),
        reasonForChange: 'theft',
        animalsMoved: -2
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 10 }),
        reasonForChange: 'sale',
        animalsMoved: -10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 12 }),
        reasonForChange: 'add',
        animalsMoved: 10
      },
      {
        createdAt: moment().set({ year: 2018, month: 10, date: 15 }),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ],
    changesArchive: {
      'Oct-2018': [
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 1 }),
          reasonForChange: 'add',
          animalsMoved: 100
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 10 }),
          reasonForChange: 'sale',
          animalsMoved: -10
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 20 }),
          reasonForChange: 'death',
          animalsMoved: -2
        },
        {
          createdAt: moment().set({ year: 2018, month: 9, date: 28 }),
          reasonForChange: 'add',
          animalsMoved: 23
        }
      ]
    }
  }
];

Bovine.collection.drop();
Class.collection.drop();
User.collection.drop();

Bovine.create(bovineData)
  .then(bovines => console.log(`created ${bovines.length} new bovines`))
  .then(() => User.create(userData))
  .then(users => console.log(`created ${users.length} new users`))
  .then(() => Class.create(classesData))
  .then(classes => console.log(`created ${classes.length} new classes`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
