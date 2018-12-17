import moment from 'moment';
import { userIds } from './ids';

export default {
  userIds,
  single: {
    _id: userIds[0],
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    firstName: 'Sean',
    surname: 'Rennie',
    dateOfBirth: moment().set({ year: 1989, month: 9, date: 30 })
  },
  other: {
    _id: userIds[1],
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
  },
  loginWrongCase: {
    email: 'Rnnsea001@gmail.com',
    password: 'pass'
  }
};
