module.exports = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'dev',
  dbUri: process.env.MONGODB_URI || `mongodb://localhost/livestock-management-app-${this.env}`
};
