// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//commands.js
require("cypress-xpath");

require('cy-verify-downloads').addCustomCommand();

Cypress.Commands.add('loginWithValidCredentials', (email, password) => { 
    cy.visit('/');

    cy.get("[type='email']")
      .type(email, { force: true })
      .type("{enter}");

    cy.get("[type='password']")
      .type(password, { force: true })
      .type("{enter}");

    cy.get("button[type='submit']").click();
    cy.checkToken();

    cy.isVisibleWithAttr("#playlists > ul > li > a",  'contain', 'Recently')
    cy.isVisibleWithAttr("#playlists > h1",  'contain', 'Playlists')
    cy.get('img.avatar').should('be.visible')
});

Cypress.Commands.add('loginWithApi', () => {
  cy.request('POST', 'https://qa.koel.app/api/me', {
    email: Cypress.env('email'),
    password: Cypress.env('password')
  }).then(
    (response) => {
      expect(response.body).to.have.property('token')
      Cypress.env('token', response.body.token)
      cy.fixture('token.json').then((data) => {
        data.token = response.body.token
      });

    }
  )
});

Cypress.Commands.add('isVisibleWithAttr', (element, attribute, value) => {
  cy.get(`${element}`)
  .should('be.visible')
  .and(`${attribute}`, value);
});

Cypress.Commands.add('findElement', (locator) => {
  cy.get(`${locator}`).then(($el) => {
    return $el.length ? true : false;
  });
});

Cypress.Commands.add('findElementByXpath', (locator) => {
 cy.xpath(locator).then(($el) => {
  return $el.length ? true : false;
  });
});

Cypress.Commands.add('findElements', (parentLocator, childElement) => {
  cy.get(`${parentLocator}`).find(`${childElement}`).should('be.visible');
});

Cypress.Commands.add('clickSideMenuItem', (menuChoice) => {
  cy.get('a').contains(`${menuChoice}`).click();
});

Cypress.Commands.add('verifyFileDownload', (fileExt) => {
  cy.verifyDownload(`${fileExt}`, {contains: true, timeout: 20000, interval: 10000});
      cy.task('countFiles', 'cypress/downloads').then((count) => {
        assert.isNotNull(count)
      })
  })
Cypress.Commands.add('connectDb', () => {
  const pool = mariadb.createPool(Cypress.env('db'));
  async function asyncFunction() {
  let conn;
  try {
  conn = await pool.getConnection();
  } catch (err) {
  throw err;
  } finally {
  if (conn) return conn.end();
  }
}

})
Cypress.Commands.add('deleteDownloadsFolder', () => {
  const downloadsFolder = Cypress.config('downloadsFolder');
  cy.task('deleteFolder', downloadsFolder);
})

//
//
// -- This is a child command --
Cypress.Commands.add('checkToken', () => {
  cy.window().its('localStorage').should("have.a.property", "api-token")
});
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })