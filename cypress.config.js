const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const testenv = process.env.TEST_ENV || config.env.testenv || 'qa.koel.app';
      function loadHost(testenv) {

        let host, appUrl, loginUrl;
        if(testenv !== 'localhost') {
          host = `${testenv}`
          appUrl = `https://${testenv}`
          loginUrl = `https://${testenv}/#!/login`
        }
        hostJson = {host: host, appUrl: appUrl, loginUrl: loginUrl};
        console.log(hostJson);
        return hostJson
      }
      const { appUrl, ...targetHost } = loadHost(testenv);
      config.env = targetHost;
      config.baseUrl = appUrl;
      return config;
    },
    defaultCommandTimeout: 9000,
    screenshotOnRunFailure: true,
    slowTestThreshold: 10000,
  },
  env: {
    user:'franz.fernando+1@testpro.io',
    password:'te$t$tudent1',
    dbUrl: 'jdbc:mariadb://104.237.13.60:3306/dbkoel',
    dbUser: 'dbuser11',
    dbPassword: 'pa$$11'
  }
});
