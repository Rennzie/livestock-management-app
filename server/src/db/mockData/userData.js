import moment from 'moment';
import { userIds } from './ids';

const userData = [
  {
    _id: userIds[0],
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    firstName: 'Sean',
    surname: 'Rennie',
    dateOfBirth: moment().set({ year: 1989, month: 9, date: 30 })
  }
];

export default userData;
