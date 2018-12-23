const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://stockman-app-12345.herokuapp.com'
    : 'http://localhost:4000';
export default API_URL;
