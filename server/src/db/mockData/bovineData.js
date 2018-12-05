import { bovineIds } from './ids';

// date as unix 10/10/2017 DD/MM/YYY
const oneYearAgo = 1507564800;

// date as unix 11/10/2018 DD/MM/YYYY
const today = 1539213325;

const bovineData = [
  // cows herd
  {
    _id: bovineIds[0],
    identifier: 'RSA-PAL-2014-01',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[1],
    identifier: 'RSA-PAL-2014-02',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[2],
    identifier: 'RSA-PAL-2014-03',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[3],
    identifier: 'RSA-PAL-2014-04',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: true
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[4],
    identifier: 'RSA-PAL-2014-05',
    birthDate: oneYearAgo,
    category: 'cow',
    breed: 'Hereford',
    breeding: {
      status: true,
      isPregnant: false
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 400, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[10],
    identifier: 'RSA-PAL-2018-06',
    birthDate: today,
    category: 'calf',
    breed: 'Hereford',
    weights: [{ timing: 'birth', weight: 250, unit: 'kgs' }]
  },
  {
    _id: bovineIds[11],
    identifier: 'RSA-PAL-2018-07',
    birthDate: today,
    category: 'calf',
    breed: 'Hereford',
    weights: [{ timing: 'birth', weight: 250, unit: 'kgs' }]
  },
  {
    _id: bovineIds[12],
    identifier: 'RSA-PAL-2018-08',
    birthDate: today,
    category: 'calf',
    breed: 'Hereford',
    weights: [{ timing: 'birth', weight: 250, unit: 'kgs' }]
  },

  // weaners herd
  {
    _id: bovineIds[5],
    identifier: 'RSA-PAL-2017-09',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[6],
    identifier: 'RSA-PAL-2017-10',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[7],
    identifier: 'RSA-PAL-2017-11',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[8],
    identifier: 'RSA-PAL-2017-12',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  },
  {
    _id: bovineIds[9],
    identifier: 'RSA-PAL-2017-13',
    birthDate: today,
    category: 'ox',
    breed: 'Hereford',
    fattening: {
      status: true,
      dateStarted: today
    },
    weights: [
      { timing: 'birth', weight: 250, unit: 'kgs' },
      { timing: 'other', weight: 300, unit: 'kgs' }
    ]
  }
];

export default bovineData;
