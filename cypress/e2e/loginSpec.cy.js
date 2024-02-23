describe('loginSpec', () => {
  it('logs in', () => {
    cy.visit('https://qa.koel.app')
    cy.get("[type='email']")
      .type(Cypress.env('user'), { force: true })
      .type("{enter}");

    cy.get("[type='password']")
      .type(Cypress.env('password'), { force: true })
      .type("{enter}");

    cy.get("button[type='submit']").click();
  })
})