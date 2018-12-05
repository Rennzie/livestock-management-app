const moment = require('moment');

const ids = [
  '5b91752666718bc8b1632705',
  '5b91752666718bc8b1632706',
  '5b91752666718bc8b1632707',
  '5b91752666718bc8b1632708'
];

module.exports = {
  ids,
  single: {
    _id: ids[0],
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    firstName: 'Sean',
    surname: 'Rennie',
    dateOfBirth: moment().set({ year: 1989, month: 9, date: 30 })
  },
  other: {
    _id: ids[1],
    username: 'Ren-dog',
    email: 'sean.rennie6@gmail.com',
    password: 'pass',
    firstName: 'Sean',
    surname: 'Rennie',
    dateOfBirth: moment().set({ year: 1989, month: 9, date: 30 })
  },
  update: {
    username: 'Pennzie',
    firstName: 'Pean'
  },
  login: {
    email: 'rnnsea001@gmail.com',
    password: 'pass'
  },
  loginWrong: {
    email: 'rnnsea001@gmail.com',
    password: 'p'
  }
};
