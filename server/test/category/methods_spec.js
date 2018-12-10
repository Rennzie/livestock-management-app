/* globals describe, it, xit, api expect beforeEach  */
import moment from 'moment';
import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const classData = categoryTestData.singleLastMonth;
const { trackedChange } = categoryTestData;

describe('CLASS Method calls', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(classData))
      .then(() => done());
  });

  it('should return an object', done => {
    api
      .post(`/api/categories/${classData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  xit('should return a new key in the changesArchive "Oct-2018"', done => {
    api
      .post(`/api/categories/${classData._id}/changes`)
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
      .post(`/api/categories/${classData._id}/changes`)
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
