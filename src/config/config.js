import dotenv from 'dotenv';

dotenv.config();

const providers = ['google'];

const callbacks = providers.map(provider =>
  process.env.NODE_ENV === 'production'
    ? `http://stockman-app-12345.herokuapp.com/${provider}/callback`
    : `http://localhost:4000/${provider}/callback`
);

const [googleURL] = callbacks;

const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
};

export default GOOGLE_CONFIG;
