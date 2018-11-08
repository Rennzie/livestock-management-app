const PORT = process.env.PORT || 4000;
const ENV =  process.env.NODE_ENV || 'dev';
const DB_URI = process.env.MONGODB_URI || `mongodb://localhost/stockman-${ENV}`;
// const VERSION = 0.0.1;

module.exports = {
  PORT,
  ENV,
  DB_URI
};
