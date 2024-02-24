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
import './commands';

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
//clicks the create playlist button
export const createNewPlaylist = () => {
    cy.get("[data-testid='sidebar-create-playlist-btn']")
    .trigger('mouseover', {eventConstructor: 'MouseEvent'})
    .click();
}
export const clickNewPlaylistContextMenu = () => {
    cy.isVisibleWithAttr("[data-testid='playlist-context-menu-create-simple']", 'contain', 'New Playlist')
    .click();
}
export const clickNewSmartPlaylistContextMenu = () => {
    cy.isVisibleWithAttr("[data-testid='playlist-context-menu-create-smart']", 'contain', 'New Smart Playlist')
    .click();
}

export const enterNewSmartPlaylistInfo = (playlist, rule) => {
    cy.contains('New Smart Playlist');
        cy.get('input[name="name"]')
            .type(`${playlist}`);
        cy.get('input[name="value[]"]')
            .type(`${rule}`);
        cy.get('button[type="submit"]')
            .contains('Save')
            .click();
}
export const enterPlaylistName = (playlist) => {
    cy.get("form[name='create-simple-playlist-form'] > input[name='name']")
            .type(`${playlist}`, { force: true })
            .type("{enter}");
}
export const contextClickDeletePlaylists = () => {
    cy.xpath('//li[@class="playlist playlist"]').each(($el) => {
        cy.wrap($el)
            .trigger('mouseover', {eventConstructor: 'MouseEvent'})
            .rightclick();

        cy.contains('Delete').click();
        cy.wrap($el).should("not.exist");
        
        assertSuccessNotificationDisplayed('Deleted');
    })
}
export const contextClickDeleteSmartPlaylists = () => {
    cy.xpath('//li[@class="playlist playlist smart"]').each(($el) => {
        cy.wrap($el)
            .trigger('mouseover', {eventConstructor: 'MouseEvent'})
            .rightclick();

        cy.contains('Delete').click();
        cy.wrap($el).should("not.exist");

        assertSuccessNotificationDisplayed('Deleted');
    })
}
export const checkUserPlaylists  = () => {
cy.get('#playlists > ul')
  .find('li')
  .then(item => {
    const itemCount = Cypress.$(item).length;
    expect(item).to.have.length(itemCount);
  });
}
export const clickHome = () => {
    cy.clickSideMenuItem('Home');
}
export const clickCurrentQueue = () => {
    cy.clickSideMenuItem('Current Queue');
}
export const clickAllSongs = () => {
    cy.clickSideMenuItem('All Songs');
}
export const clickAlbums = () => {
    cy.clickSideMenuItem('Albums');
}
export const clickFavorites = () => {
    cy.clickSideMenuItem('Favorites');
}
export const clickArtists = () => {
    cy.clickSideMenuItem('Artists');
}
export const clickRecentlyPlayed = () => {
    cy.clickSideMenuItem('Recently Played');
}
export const compareUrl = (location) => {
    cy.url().should('equal', `https://qa.koel.app/#!/${location}`);
}
export const verifySearchInHeader = (word) => {
    cy.get('#searchForm > input').type(word);
    cy.get('h1').should('contain', `Search Results for ${word}`);
}
export const invokeSearchByKeybd = () => {
    cy.get('body').type('f')
}
