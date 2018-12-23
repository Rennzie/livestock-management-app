const API_URL =
  process.env.NODE_ENV === 'production'
    ? [
        'http://localhost:4000'
        // 'http://stockman-app-12345.herokuapp.com',
        // 'http://shallow-citadel-6j2x6vuw22eusm7mkcj10ief.herokudns.com',
        // 'http://enigmatic-snake-inedbzvg3o8t7d89xzxpa54w.herokudns.com'
      ]
    : 'http://localhost:4000';

export default API_URL;
