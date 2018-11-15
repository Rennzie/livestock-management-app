const moment = require('moment');

const ids = [
  '5b91752666708bc8b1632821', '5b91752666708bc8b1632806', '5b91752666708bc8b1632807', '5b91752666708bc8b1632808'
];

module.exports = {
  classIds: ids,
  single: {
    _id: ids[1],
    name: 'breeding',
    class: 'cows',
    changes: [
      {
        createdAt: moment().subtract(7, 'months'),
        reasonForChange: 'add',
        animalsMoved: 100
      },{
        createdAt: moment().subtract(8, 'weeks'),
        reasonForChange: 'add',
        animalsMoved: 100
      }, {
        createdAt: moment().subtract(6, 'weeks'),
        reasonForChange: 'sale',
        animalsMoved: -10
      }, {
        createdAt: moment().subtract(4, 'weeks'),
        reasonForChange: 'death',
        animalsMoved: -2
      }, {
        createdAt: moment().subtract(3, 'weeks'),
        reasonForChange: 'add',
        animalsMoved: 23
      }, {
        createdAt: moment().subtract(2, 'weeks'),
        reasonForChange: 'add',
        animalsMoved: 50
      }, {
        createdAt: moment().subtract(1, 'weeks'),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ]
  },
  trackedChange: {
    _id: ids[2],
    createdAt: moment(),
    reasonForChange: 'death',
    animalsMoved: -10
  }
};
