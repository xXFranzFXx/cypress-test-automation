// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
export const assertRecentlyPlayedVisibility = () => {
    cy.isVisibleWithAttr("#playlists > ul > li > a",  'contain', 'Recently')
}
export const assertPlaylistsSMVisibility = () => {
    cy.isVisibleWithAttr("#playlists > h1",  'contain', 'Playlists')
}
export const assertSuccessNotificationDisplayed = (playlist) => {
    cy.isVisibleWithAttr("div > .success.show",  'contain', playlist)
}
export const assertDeleteSuccessMsgDisplayed = () => {
    cy.isVisibleWithAttr("div > .success.show",  'contain', 'Deleted')
}
export const clickNewPlaylistContextMenu = () => {
    cy.isVisibleWithAttr("nav > ul > li[data-testid='playlist-context-menu-create-simple']", 'contain', 'New Playlist')
    .click()
}
export const enterPlaylistName = (playlist) => {
    cy.get("form[name='create-simple-playlist-form'] > input[name='name']")
            .type(`${playlist}`, { force: true })
            .type("{enter}")
}
export const contextClickDeleteFirstPlaylist = () => {
    cy.get(".playlist.recently-played").next('li')
        .trigger('mouseover', {eventConstructor: 'MouseEvent'})
        .rightclick();
    cy.contains('Delete').click()
}


// Alternatively you can use CommonJS syntax:
// require('./commands')