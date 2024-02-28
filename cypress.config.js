require('dotenv').config();
const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');
const mariadb = require('cypress-maria-db');
const { fs, rmdir } = require('fs');




module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  retries: 1,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    ...process.env,
    "db": {
      "host": `${process.env.dbUrl}`,
      "user": `${process.env.dbUser}`,
      "password": `${process.env.dbPassword}`,
      "connectionLimit": 5
  },
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', verifyDownloadTasks);
      on('task', mariadb.loadDBPlugin(config.env.db));

      on('task', {
        deleteFolder(folderName) {
          console.log('deleting folder %s', folderName)
          return new Promise((resolve, reject) => {
            rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err);
                return reject(err);
              }
              resolve(null)
            })
          })
        }
      })

      on('task', {
        countFiles(folderName) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderName, (err, files) => {
              if (err) {
                return reject(err);
              }
              resolve(files.length);
            });
          });
        }
      });

      on('task', {
        getFirstFile(folderName) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderName, (err, files) => {
              if (err) {
                return reject(err);
              }
              resolve(files[0]);
            });
          });
        }
      });
      const testenv = process.env.TEST_ENV || config.env.testenv || 'qa.koel.app';
      
      function loadHost(testenv) {
        let host, appUrl, loginUrl;
        if(testenv !== 'localhost') {
          host = `${testenv}`
          appUrl = `https://${testenv}`
          loginUrl = `https://${testenv}/#!/login`
        }

        hostJson = {
          host: host,
          appUrl: appUrl, 
          loginUrl: loginUrl
        };
        console.log(hostJson);
        return hostJson;
      }

      const { appUrl,  ...targetHost } = loadHost(testenv);
      config.env = targetHost;
      config.baseUrl = appUrl;
      return config;

    },
    
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/reports/screenshots',
    slowTestThreshold: 10000,
    downloadsFolder: 'cypress/downloads',
    trashAssetsBeforeRuns: true,
    includeShadowDom: true
  },
  
});
