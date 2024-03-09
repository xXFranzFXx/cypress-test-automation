describe('Log in tests', () => {
  it('successfully log the user in', () => {
    cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'));
  });

  it('log in through api and save token from response body', () => {
    cy.request('POST', 'https://qa.koel.app/api/me', {
    email: Cypress.env('user'),
    password: Cypress.env('password')
  }).then(
    (response) => {
      expect(response.body).to.have.property('token');
      cy.writeFile('cypress/fixtures/token.json', response.body);
     });
  });
})