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

function createChange(month, year, date, reasonForChange, animalsMoved) {
  const createdAt = moment().set({ year, month, date });

  return { createdAt, reasonForChange, animalsMoved };
}

const categoriesData = [
  {
    _id: categoryIds[0],
    farm: farmIds[0],
    category: 'oxen-1-2',
    currentMonthDetail: {
      openingTotal: 0,
      period: moment().format('MMM-YYYY'),
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1, 'death', -2),
      createChange(thisMonth, thisYear, 3, 'purchase', 200),
      createChange(thisMonth, thisYear, 10, 'sale', -20),
      createChange(thisMonth, thisYear, 15, 'sale', -20),
      createChange(thisMonth, thisYear, 20, 'death', -1)
    ]
  },
  {
    _id: categoryIds[1],
    farm: farmIds[0],
    category: 'cows',
    currentMonthDetail: {
      openingTotal: 0,
      period: moment().format('MMM-YYYY'),
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1, 'add', 200),
      createChange(thisMonth, thisYear, 10, 'theft', -2),
      createChange(thisMonth, thisYear, 15, 'theft', -1),
      createChange(thisMonth, thisYear, 20, 'death', -1)
    ]
  },
  {
    _id: categoryIds[2],
    farm: farmIds[0],
    category: 'oxen-2-3',
    currentMonthDetail: {
      openingTotal: 0,
      period: moment().format('MMM-YYYY'),
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1, 'death', -2),
      createChange(thisMonth, thisYear, 3, 'add', 140),
      createChange(thisMonth, thisYear, 10, 'sale', -20),
      createChange(thisMonth, thisYear, 15, 'sale', -20),
      createChange(thisMonth, thisYear, 20, 'death', -1)
    ]
  },
  {
    _id: categoryIds[3],
    farm: farmIds[0],
    category: 'calves',
    currentMonthDetail: {
      openingTotal: 0,
      period: moment().format('MMM-YYYY'),
      closingTotal: 111
    },
    currentMonthChanges: [
      createChange(thisMonth, thisYear, 1, 'death', -2),
      createChange(thisMonth, thisYear, 3, 'purchase', 200),
      createChange(thisMonth, thisYear, 10, 'sale', -20),
      createChange(thisMonth, thisYear, 15, 'sale', -20),
      createChange(thisMonth, thisYear, 20, 'death', -1)
    ]
  }
];

export default categoriesData;
