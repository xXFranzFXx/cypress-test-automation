const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    user:'franz.fernando+1@testpro.io',
    password:'te$t$tudent1'
  }
});
