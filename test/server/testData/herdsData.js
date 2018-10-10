const bovineTestData = require('./bovinesData');
const bovineIds = bovineTestData.bovineIds;

const herdIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806', '5b91752666708bc8b1622807', '5b91752666708bc8b1622808'
];

module.exports = {
  herdIds: herdIds,
  single: {
    _id: herdIds[0],
    name: 'Braford Breeding Group A',
    animals: [bovineIds[0]],
    category: 'breeding'
  },

  updateSingle: {
    _id: herdIds[0],
    name: 'Braford Breeding Group B'
  },

  multiple: [
    {
      _id: herdIds[0],
      name: 'Braford Breeding Group A',
      animals: ['5b91752666708bc8b1622721'],
      category: 'breeding'
    },{
      _id: herdIds[1],
      name: 'Hereford Fattening Group A',
      animals: ['5b91752666708bc8b1622705'],
      category: 'fattening'
    }
  ]
};
