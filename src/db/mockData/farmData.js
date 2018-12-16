import { farmIds, userIds } from './ids';

const farmData = [
  {
    _id: farmIds[0],
    name: 'Example',
    farmOwner: userIds[0]
  },
  {
    _id: farmIds[2],
    name: 'Example Two',
    farmOwner: userIds[0]
  },
  {
    _id: farmIds[1],
    name: 'Rocklands',
    farmOwner: userIds[1]
  }
];

export default farmData;
