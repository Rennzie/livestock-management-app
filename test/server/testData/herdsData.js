const herdIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806', '5b91752666708bc8b1622807', '5b91752666708bc8b1622808'
];

module.exports = {
  herdIds: herdIds,
  single: {
    _id: herdIds[0],
    name: 'Braford Breeding Group A',
    category: 'cows'
  },

  updateSingle: {
    name: 'Braford Breeding Group B'
  },

  multiple: [
    {
      _id: herdIds[0],
      name: 'Braford Breeding Group A',
      category: 'cows'
    },{
      _id: herdIds[1],
      name: 'Hereford Fattening Group A',
      category: 'pasturelot'
    }
  ]
};
