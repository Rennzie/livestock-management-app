/* globals describe, it, api expect beforeEach */
const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');

//--- TEST DATA ---//
const herdData = herdTestData.multiple;
// const herdIds = herdTestData.herdIds;

describe('GET /herds', () => {
  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/herds')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array of the correct length that contains objects', done => {
    api.get('/api/herds')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body.length).to.eq(herdData.length);
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/herds')
      .end((err, res) => {
        console.log('the expected data is =========> ', res.body)
        res.body.forEach( herd => {
          const testHerd = herdData.filter( herdTest => herd._id.toString() === herdTest._id )[0];
          expect(herd.name).to.be.eq(testHerd.name);
          // expect(herd.animals).to.eql(testHerd.animals);
          expect(herd.category).to.eq(testHerd.category);
        });
        done();
      });
  });

});
