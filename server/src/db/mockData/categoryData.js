import moment from 'moment';

import { categoryIds, farmIds } from './ids';

const categoriesData = [
  {
    _id: categoryIds[0],
    farm: farmIds[0],
    class: 'cows',
    currentMonthDetail: {
      openingTotal: 0,
      period: 'Oct-2018',
      changes: [
        { name: 'add', total: 100 },
        { name: 'death', total: -2 },
        { name: 'sale', total: -10 }
      ],
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
    prevMonthsChanges: [
      {
        period: 'Oct-2018',
        changes: [
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
    ]
  }
];

export default categoriesData;
