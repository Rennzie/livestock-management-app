
const bovineIds = [
  '5b91752666708bc8b1622721', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const herdIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806', '5b91752666708bc8b1622807', '5b91752666708bc8b1622808'
];

// const userIds = [
//   '5b91752666708bc8b1622709', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c'
// ];

// date as unix 10/10/2017 DD/MM/YYY
const oneYearAgo = 1507564800;

// date as unix 11/10/2018 DD/MM/YYYY
const today = 1539213325;

module.exports = {
  bovineIds: bovineIds,

  currentSingle: {
    _id: bovineIds[0],
    birthDate: oneYearAgo,
    // purchaseDate: ,
    category: 'calf',
    breed: 'Hereford',
    weights: [{_id: bovineIds[1], timing: 'birth', weight: 250, unit: 'kgs'}]
  },
  motherCow: {
    _id: bovineIds[0],
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true,
      production: [ bovineIds[1], bovineIds[2] ]
    },
    weights: [
      {timing: 'birth', weight: 250, unit: 'kgs'},
      {timing: 'other', weight: 500, unit: 'kgs'}
    ]
  },

  newCalf: {
    _id: bovineIds[3],
    birthDate: today,
    mother: bovineIds[0],
    category: 'calf',
    breed: 'Hereford'
  },

  currentMulti: [
    {
      _id: bovineIds[0],
      birthDate: oneYearAgo,
      // purchaseDate: ,
      herd: herdIds[0],
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }, {
      _id: bovineIds[1],
      birthDate: oneYearAgo,
      // purchaseDate: ,
      herd: herdIds[0],
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }, {
      _id: bovineIds[2],
      birthDate: oneYearAgo,
      // purchaseDate: ,
      herd: herdIds[0],
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }, {
      _id: bovineIds[3],
      birthDate: oneYearAgo,
      // purchaseDate: ,
      herd: herdIds[0],
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }
  ],

  updatedCategories: {
    ids: [ bovineIds[0], bovineIds[1], bovineIds[2], bovineIds[3] ],
    newCategory: 'ox'
  },

  currentSingleEdit: {
    category: 'ox',
    breed: 'Brahman'
  },

  archivedSingle: {
    _id: bovineIds[0],
    category: 'calf',
    methodOfRemoval: 'sale',
    sale: {
      saleRevenue: 10000,
      revenueCurrency: 'ZAR',
      saleDate: today
    },
    weights: [
      {timing: 'birth', weight: 500, unit: 'kgs'},
      {timing: 'sale', weight: 500, unit: 'kgs'}
    ]
  },

  archivedMulti: [
    {
      _id: bovineIds[0],
      category: 'ox',
      methodOfRemoval: 'sale',
      birthDate: oneYearAgo,
      sale: {
        saleRevenue: 10000,
        revenueCurrency: 'ZAR',
        saleDate: today
      },
      weights: [
        {timing: 'birth', weight: 500, unit: 'kgs'},
        {timing: 'sale', weight: 500, unit: 'kgs'}
      ]
    },{
      _id: bovineIds[1],
      category: 'ox',
      methodOfRemoval: 'sale',
      birthDate: oneYearAgo,
      sale: {
        saleRevenue: 10000,
        revenueCurrency: 'ZAR',
        saleDate: today
      },
      weights: [
        {timing: 'birth', weight: 500, unit: 'kgs'},
        {timing: 'sale', weight: 500, unit: 'kgs'}
      ]
    }
  ],

  newWeight: {
    _id: bovineIds[2],
    timing: 'other',
    weight: 350,
    unit: 'kgs'
  }

};
