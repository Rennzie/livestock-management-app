/* globals describe, it, xit, api expect beforeEach  */
import moment from 'moment';
import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.singleLastMonth;
const { trackedChange } = categoryTestData;

/**
 *  AIM: To test the virtual methods for the category model
 *
 *  CURRENTLY:
 *  1) The model updates the currentMonthDetail on every save
 *  2) Whenever a new change is added it checks the month is the current month
 *      adds the change or archives all the changes and starts a new detail summary
 *
 *  IT SHOULD:
 *  1) Before any query, find() or findOne() the detail should be validated and
 *        if its a new month it should run all the archives and start a new monthsDetail
 *  2) saving a new change should add the change then run the month detail update
 *  3) This could be done by an instance method which is run after find but before return?
 */

describe('CATEGORY Method calls', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return an object', done => {
    api
      .post(`/api/categories/${categoryData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  xit('should return a new key in the changesArchive "Oct-2018"', done => {
    api
      .post(`/api/categories/${categoryData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        const key = 'Oct-2018';
        expect(res.body.changesArchive).to.have.property('Oct-2018');
        expect(res.body.changesArchive[key].length).to.eq(categoryData.currentMonthChanges.length);
        done();
      });
  });

  xit('the new key should not have any items with the wrong month', done => {
    api
      .post(`/api/categories/${categoryData._id}/changes`)
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
