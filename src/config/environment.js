const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'dev';
const DB_URI = process.env.MONGODB_URI || `mongodb://localhost/stockman-${ENV}`;
const SECRET = process.env.SECRET || 'justAlittleSecret';

module.exports = {
  PORT,
  ENV,
  DB_URI,
  SECRET
};

// NEXT: teach heroku to run a build when deployed
