/* globals describe, it, xit, api expect beforeEach  */
import moment from 'moment';
import Class from '../../src/models/class';
import classTestData from '../testData/classData';

// --- TEST DATA ---//
const classData = classTestData.singleLastMonth;
const { trackedChange } = classTestData;

describe('CLASS Method calls', () => {
  beforeEach(done => {
    Class.deleteMany({})
      .then(() => Class.create(classData))
      .then(() => done());
  });

  it('should return an object', done => {
    api
      .post(`/api/classes/${classData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        console.log('=======> ', res.body.changesArchive);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  xit('should return a new key in the changesArchive "Oct-2018"', done => {
    api
      .post(`/api/classes/${classData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        const key = 'Oct-2018';
        expect(res.body.changesArchive).to.have.property('Oct-2018');
        expect(res.body.changesArchive[key].length).to.eq(classData.currentMonthChanges.length);
        done();
      });
  });

  xit('the new key should not have any items with the wrong month', done => {
    api
      .post(`/api/classes/${classData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        const key = 'Oct-2018';
        res.body.changesArchive[key].forEach(change => {
          // eslint-disable-next-line no-unused-expressions
          moment(change.period).format('MMM-YYYY') === key;
        });
        done();
      });
  });
});
