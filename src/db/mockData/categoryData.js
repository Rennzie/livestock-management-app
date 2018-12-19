import moment from 'moment';

import { categoryIds, farmIds } from './ids';

const thisMonth = moment().month();
const thisYear = moment().year();
const lastMonthString = moment()
  .subtract(1, 'month')
  .format('MMM-YYYY');

function generateRandomDate() {
  return Math.floor(Math.random() * 28);
}

function chooseReason() {
  const changes = ['add', 'purchase', 'death', 'theft', 'sale', 'other'];
  const choiceIndex = Math.floor(Math.random() * changes.length);

  return changes[choiceIndex];
}

function generateRandomNumber(change) {
  const number = [2, 5, 10, 50, 100];
  const numberNegative = [2, 5, 10];
  const choiceIndex = Math.floor(Math.random() * number.length);
  const choiceIndexNegative = Math.floor(Math.random() * numberNegative.length);
  if (change === 'add' || change === 'purchase') {
    return number[choiceIndex];
  }

  return numberNegative[choiceIndexNegative] * -1;
}

function createChange(month, year) {
  const date = generateRandomDate();
  const createdAt = moment().set({ year, month, date });
  const reasonForChange = chooseReason();
  const animalsMoved = generateRandomNumber(reasonForChange);

  return { createdAt, reasonForChange, animalsMoved };
}

const categoriesData = [
  {
    _id: categoryIds[0],
    farm: farmIds[0],
    category: 'cows',
    currentMonthDetail: {
      openingTotal: 0,
      period: lastMonthString,
      changes: [
        { name: 'add', total: 100 },
        { name: 'death', total: -2 },
        { name: 'sale', total: -10 }
      ],
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1),
      createChange(thisMonth, thisYear, 3),
      createChange(thisMonth, thisYear, 10),
      createChange(thisMonth, thisYear, 15),
      createChange(thisMonth, thisYear, 20)
    ],
    prevMonthsChanges: [
      {
        period: lastMonthString,
        changes: [
          createChange(thisMonth - 1, thisYear, 1),
          createChange(thisMonth - 1, thisYear, 4),
          createChange(thisMonth - 1, thisYear, 10),
          createChange(thisMonth - 1, thisYear, 15),
          createChange(thisMonth - 1, thisYear, 27),
          createChange(thisMonth - 1, thisYear, 30)
        ]
      }
    ]
  },
  {
    _id: categoryIds[1],
    farm: farmIds[0],
    category: 'oxen-1-2',
    currentMonthDetail: {
      openingTotal: 0,
      period: lastMonthString,
      changes: [
        { name: 'add', total: 100 },
        { name: 'death', total: -2 },
        { name: 'sale', total: -10 }
      ],
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1),
      createChange(thisMonth, thisYear, 3),
      createChange(thisMonth, thisYear, 10),
      createChange(thisMonth, thisYear, 15),
      createChange(thisMonth, thisYear, 20)
    ],
    prevMonthsChanges: [
      {
        period: lastMonthString,
        changes: [
          createChange(thisMonth - 1, thisYear, 1),
          createChange(thisMonth - 1, thisYear, 4),
          createChange(thisMonth - 1, thisYear, 10),
          createChange(thisMonth - 1, thisYear, 15),
          createChange(thisMonth - 1, thisYear, 27),
          createChange(thisMonth - 1, thisYear, 30)
        ]
      }
    ]
  },
  {
    _id: categoryIds[2],
    farm: farmIds[0],
    category: 'calves',
    currentMonthDetail: {
      openingTotal: 0,
      period: lastMonthString,
      changes: [
        { name: 'add', total: 100 },
        { name: 'death', total: -2 },
        { name: 'sale', total: -10 }
      ],
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1),
      createChange(thisMonth, thisYear, 3),
      createChange(thisMonth, thisYear, 10),
      createChange(thisMonth, thisYear, 15),
      createChange(thisMonth, thisYear, 20)
    ],
    prevMonthsChanges: [
      {
        period: lastMonthString,
        changes: [
          createChange(thisMonth - 1, thisYear, 1),
          createChange(thisMonth - 1, thisYear, 4),
          createChange(thisMonth - 1, thisYear, 10),
          createChange(thisMonth - 1, thisYear, 15),
          createChange(thisMonth - 1, thisYear, 27),
          createChange(thisMonth - 1, thisYear, 30)
        ]
      }
    ]
  },
  {
    _id: categoryIds[3],
    farm: farmIds[1],
    category: 'cows',
    currentMonthDetail: {
      openingTotal: 0,
      period: lastMonthString,
      changes: [
        { name: 'add', total: 100 },
        { name: 'death', total: -2 },
        { name: 'sale', total: -10 }
      ],
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1),
      createChange(thisMonth, thisYear, 3),
      createChange(thisMonth, thisYear, 10),
      createChange(thisMonth, thisYear, 15),
      createChange(thisMonth, thisYear, 20)
    ],
    prevMonthsChanges: [
      {
        period: lastMonthString,
        changes: [
          createChange(thisMonth - 1, thisYear, 1),
          createChange(thisMonth - 1, thisYear, 4),
          createChange(thisMonth - 1, thisYear, 10),
          createChange(thisMonth - 1, thisYear, 15),
          createChange(thisMonth - 1, thisYear, 27),
          createChange(thisMonth - 1, thisYear, 30)
        ]
      }
    ]
  },
  {
    _id: categoryIds[4],
    farm: farmIds[1],
    category: 'oxen-2-3',
    currentMonthDetail: {
      openingTotal: 0,
      period: lastMonthString,
      changes: [
        { name: 'add', total: 100 },
        { name: 'death', total: -2 },
        { name: 'sale', total: -10 }
      ],
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1),
      createChange(thisMonth, thisYear, 3),
      createChange(thisMonth, thisYear, 10),
      createChange(thisMonth, thisYear, 15),
      createChange(thisMonth, thisYear, 20)
    ],
    prevMonthsChanges: [
      {
        period: lastMonthString,
        changes: [
          createChange(thisMonth - 1, thisYear, 1),
          createChange(thisMonth - 1, thisYear, 4),
          createChange(thisMonth - 1, thisYear, 10),
          createChange(thisMonth - 1, thisYear, 15),
          createChange(thisMonth - 1, thisYear, 27),
          createChange(thisMonth - 1, thisYear, 30)
        ]
      }
    ]
  }
];

export default categoriesData;
