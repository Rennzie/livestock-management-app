const port = process.env.PORT || 4000;
const env =  process.env.NODE_ENV || 'dev';
const dbUri = process.env.MONGODB_URI || `mongodb://localhost/stockman-${env}`;

module.exports = {
  port,
  env,
  dbUri
};
