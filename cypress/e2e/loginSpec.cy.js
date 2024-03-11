describe('Log in tests', () => {
 context('Login using the UI', () => {
    it('successfully log the user in', () => {
      cy.visit('/');

      cy.get("[type='email']")
        .type(Cypress.env('user'), { force: true })
        .type("{enter}");

      cy.get("[type='password']")
        .type(Cypress.env('password'), { force: true })
        .type("{enter}");

      cy.get("button[type='submit']").click();
    });
});

  context('Login using the api', () => {
    it('save token from response body', () => {
      cy.request('POST', 'https://qa.koel.app/api/me', {
      email: Cypress.env('user'),
      password: Cypress.env('password')
    }).then(
      (response) => {
        expect(response.body).to.have.property('token');
        cy.writeFile('cypress/fixtures/token.json', response.body);
      });
    });
  });
})