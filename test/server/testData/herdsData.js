const herdIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806', '5b91752666708bc8b1622807', '5b91752666708bc8b1622808'
];

module.exports = {
  herdIds: herdIds,
  single: {
    _id: herdIds[0],
    name: 'Whitefaced Breeding Herd',
    class: 'cows'
  },

  single2: {
    _id: herdIds[1],
    name: 'Braford Breeding Group A',
    class: 'cows'
  },

  updateSingle: {
    name: 'Braford Breeding Group B'
  },

  multiple: [
    {
      _id: herdIds[0],
      name: 'Braford Breeding Group A',
      class: 'cows'
    },{
      _id: herdIds[1],
      name: 'Hereford Fattening Group A',
      class: 'pasturelot'
    }
  ]
};
