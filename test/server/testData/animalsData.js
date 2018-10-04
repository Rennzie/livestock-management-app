const animalIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const userIds = [
  '5b91752666708bc8b1622709', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c'
];

module.exports = {
  animalIds: animalIds,

  currentSingle: {
    _id: animalIds[0],
    // dateOfBirth: ,
    // dateOfPurchase: ,
    type: 'cow',
    owners: [ userIds[1] ],
    weights: [{weight: 250, unit: 'kgs'}]
  },

  archivedSingleEdit: {
    type: 'cow',
    methodOfRemoval: 'death',
    // dateOfRemoval: ,
    saleRevenue: null,
    revenueCurrency: 'ZAR',
    saleWeight: null,
    weightUnit: 'kgs'
  },

  currentMulit: [
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
  ],

  archivedSingle: {
    type: 'cow',
    methodOfRemoval: 'sale',
    owners: [ userIds[1] ],
    weights: [{weight: 250, unit: 'kgs'}],
    saleRevenue: 10000,
    revenueCurrency: 'ZAR',
    saleWeight: 400,
    weightUnit: 'kgs'
  },

  newWeight: {
    _id: animalIds[2],
    weight: 350,
    unit: 'kgs'
  },

  archivedMulti: [
    {
      _id: animalIds[0],
      type: 'cow',
      methodOfRemoval: 'sale',
      saleRevenue: 10000,
      revenueCurrency: 'ZAR',
      saleWeight: 400,
      weightUnit: 'kgs'
    },{
      _id: animalIds[1],
      type: 'cow',
      methodOfRemoval: 'sale',
      saleRevenue: 7000,
      revenueCurrency: 'ZAR',
      saleWeight: 300,
      weightUnit: 'kgs',
      weights: [{weight: 500, unit: 'kgs'}]
    }
  ]
};
