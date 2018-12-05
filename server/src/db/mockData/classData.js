import moment from 'moment';

import { classIds, farmIds } from './ids';

const classesData = [
  {
    _id: classIds[0],
    farm: farmIds[0],
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
    farm: farmIds[0],
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
    farm: farmIds[0],
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
    farm: farmIds[0],
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

export default classesData;
