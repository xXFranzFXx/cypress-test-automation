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

require("cypress-xpath");
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

});

Cypress.Commands.add('loginWithApi', (email, password) => {
  cy.request('POST', '/', {
    email: email,
    password: password
  });
  cy.checkToken();
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