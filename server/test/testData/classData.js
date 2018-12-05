const moment = require('moment');

const ids = [
  '5b91752666708bc8b1632821',
  '5b91752666708bc8b1632806',
  '5b91752666708bc8b1632807',
  '5b91752666708bc8b1632808'
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
      },
      {
        createdAt: moment().subtract(8, 'weeks'),
        reasonForChange: 'add',
        animalsMoved: 100
      },
      {
        createdAt: moment().subtract(6, 'weeks'),
        reasonForChange: 'sale',
        animalsMoved: -10
      },
      {
        createdAt: moment().subtract(4, 'weeks'),
        reasonForChange: 'death',
        animalsMoved: -2
      },
      {
        createdAt: moment().subtract(3, 'weeks'),
        reasonForChange: 'add',
        animalsMoved: 23
      },
      {
        createdAt: moment().subtract(2, 'weeks'),
        reasonForChange: 'add',
        animalsMoved: 50
      },
      {
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
  },

  singleLastMonth: {
    _id: ids[0],
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
        createdAt: moment().set({ year: 2018, month: 9, date: 1 }),
        reasonForChange: 'add',
        animalsMoved: 50
      },
      {
        createdAt: moment().set({ year: 2018, month: 9, date: 7 }),
        reasonForChange: 'theft',
        animalsMoved: -2
      },
      {
        createdAt: moment().set({ year: 2018, month: 9, date: 10 }),
        reasonForChange: 'sale',
        animalsMoved: -10
      },
      {
        createdAt: moment().set({ year: 2018, month: 9, date: 12 }),
        reasonForChange: 'add',
        animalsMoved: 10
      },
      {
        createdAt: moment().set({ year: 2018, month: 9, date: 15 }),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ],
    changesArchive: {
      'Sep-2018': [
        {
          createdAt: moment().set({ year: 2018, month: 8, date: 1 }),
          reasonForChange: 'add',
          animalsMoved: 100
        },
        {
          createdAt: moment().set({ year: 2018, month: 8, date: 10 }),
          reasonForChange: 'sale',
          animalsMoved: -10
        },
        {
          createdAt: moment().set({ year: 2018, month: 8, date: 20 }),
          reasonForChange: 'death',
          animalsMoved: -2
        },
        {
          createdAt: moment().set({ year: 2018, month: 8, date: 28 }),
          reasonForChange: 'add',
          animalsMoved: 23
        }
      ]
    }
  }
};
