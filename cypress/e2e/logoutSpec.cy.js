describe('Logout functionality tests', () => {
  beforeEach(() => {
    cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'));
  });

  it('logs the user out after logging in', () => {
    cy.get('[data-testid="btn-logout"] > i').should('be.visible').click()
    cy.contains('Registration')
  });
  
})