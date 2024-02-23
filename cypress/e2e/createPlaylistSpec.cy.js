describe('createPlaylistSpec', () => {
    it('creates a new playlist', () => {
        cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'))
      
        cy.get("#playlists > ul > li > a")
            .should('be.visible')
            .and('contain', 'Recently')

        cy.get("#playlists > h1")
            .should('be.visible')
            .and('contain', 'Playlists')

        cy.get("i[data-testid='sidebar-create-playlist-btn']")
            .trigger('mouseover', {eventConstructor: 'MouseEvent'})
            .click()

        cy.get("nav > ul > li[data-testid='playlist-context-menu-create-simple']")
            .should('be.visible')
            .and('contain', 'New Playlist')
            .click()

        cy.get("form[name='create-simple-playlist-form'] > input[name='name']")
            .type("playlist", { force: true })
            .type("{enter}")

        cy.get("div > .success.show")
            .should('be.visible')
            .and('contain', "playlist")
    })
  })