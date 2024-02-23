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
Cypress.Commands.add('checkToken', () => {
    cy.window().its('localStorage').should("have.a.property", "api-token")
})
Cypress.Commands.add('loginWithValidCredentials', (email, password) => { 
    cy.visit('https://qa.koel.app')
    cy.get("[type='email']")
      .type(email, { force: true })
      .type("{enter}");

    cy.get("[type='password']")
      .type(password, { force: true })
      .type("{enter}");

    cy.get("button[type='submit']").click()
    cy.checkToken()
   
 
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })