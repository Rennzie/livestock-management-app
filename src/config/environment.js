const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'dev';
const DB_URI = process.env.MONGODB_URI || `mongodb://localhost/stockman-${ENV}`;
const SECRET = process.env.SECRET || 'justAlittleSecret';
const CLIENT_ORIGIN = ['https://localhost:8000/api', 'https://localhost:8000/api'];
// process.env.NODE_ENV === 'production'
//   ? 'http://react-auth-twitter.netlify.com'
// :
module.exports = {
  PORT,
  ENV,
  DB_URI,
  SECRET,
  CLIENT_ORIGIN
};
