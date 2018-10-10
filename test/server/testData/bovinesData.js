const bovineIds = [
  '5b91752666708bc8b1622721', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

// const userIds = [
//   '5b91752666708bc8b1622709', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c'
// ];

module.exports = {
  bovineIds: bovineIds,

  currentSingle: {
    _id: bovineIds[0],
    // birthDate: ,
    // purchaseDate: ,
    category: 'calf',
    breed: 'Hereford',
    weights: [{_id: bovineIds[1], timing: 'birth', weight: 250, unit: 'kgs'}]
  },

  currentMulti: [
    {
      _id: bovineIds[0],
      // birthDate: ,
      // purchaseDate: ,
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }, {
      _id: bovineIds[1],
      // birthDate: ,
      // purchaseDate: ,
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }, {
      _id: bovineIds[2],
      // birthDate: ,
      // purchaseDate: ,
      category: 'calf',
      breed: 'Hereford',
      weights: [{timing: 'birth', weight: 250, unit: 'kgs'}]
    }, {
      _id: bovineIds[3],
      // birthDate: ,
      // purchaseDate: ,
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
      revenueCurrency: 'ZAR'
      // saleDate:
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
      sale: {
        saleRevenue: 10000,
        revenueCurrency: 'ZAR'
        // saleDate:
      },
      weights: [
        {timing: 'birth', weight: 500, unit: 'kgs'},
        {timing: 'sale', weight: 500, unit: 'kgs'}
      ]
    },{
      _id: bovineIds[1],
      category: 'ox',
      methodOfRemoval: 'sale',
      sale: {
        saleRevenue: 10000,
        revenueCurrency: 'ZAR'
        // saleDate:
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
