process.env.NODE_ENV = 'test';

global.Promise = require('bluebird');

const chai = require('chai');
global.should = chai.should();
global.expect = chai.expect;

chai.use(require('chai-like'));
chai.use(require('chai-things'));

const supertest = require('supertest');
const app = require('../../index');

global.api = supertest(app);
