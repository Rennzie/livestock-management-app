import { userIds, farmIds } from './ids';

export default {
  single: {
    _id: farmIds[0],
    name: 'Palmiet',
    farmOwner: userIds[0]
  },
  multi: [
    {
      _id: farmIds[1],
      name: 'Rocklands',
      farmOwner: userIds[2]
    },
    {
      _id: farmIds[0],
      name: 'Palmiet',
      farmOwner: userIds[0]
    }
  ]
};
