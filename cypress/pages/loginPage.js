class loginPage {
    elements = {
        emailInputField : () => cy.get("[type='email']"),
        passwordInputField : () =>  cy.get("[type='password']"),
        submitButton : () => cy.get("[type='submit']")
    }
    login(email, password) {
        this.elements.emailInputField()
            .type(email, { force: true })
            .type("{enter}");
        this.elements.passwordInputField()
            .type(password, { force: true })
            .type("{enter}");
        this.elements.submitButton().click();
    }
}
module.exports = new loginPage();