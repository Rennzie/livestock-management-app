import moment from 'moment';
import { userIds } from './ids';

const userData = [
  {
    _id: userIds[0],
    username: 'Example',
    email: 'example@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    firstName: 'User',
    surname: 'Name',
    dateOfBirth: moment().set({ year: 1989, month: 9, date: 30 })
  },
  {
    _id: userIds[1],
    username: 'Mike',
    email: 'palmiet.rennie@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    firstName: 'Michael',
    surname: 'Rennie',
    dateOfBirth: moment().set({ year: 1961, month: 6, date: 13 })
  }
];

export default userData;
