const { assertRecentlyPlayedVisibility, assertPlaylistsSMVisibility, assertSuccessNotificationDisplayed, clickNewPlaylistContextMenu, enterPlaylistName, contextClickFirstPlaylist, contextClickDeleteFirstPlaylist } = require("../support/e2e")
require('cypress-xpath');

describe('koelUserPlaylists', () => {
    beforeEach(() => {
        cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'))
        // assertRecentlyPlayedVisibility();
        // assertPlaylistsSMVisibility();
    })
    // it('creates a new playlist', () => {
        
        
       
    //     cy.get("i[data-testid='sidebar-create-playlist-btn']")
    //         .trigger('mouseover', {eventConstructor: 'MouseEvent'})
    //         .click();

    //     clickNewPlaylistContextMenu();
    //     enterPlaylistName("playlist");
    //     assertSuccessNotificationDisplayed("playlist");
    // })
    // it('deletes a playlist', () => {
    //    contextClickDeleteFirstPlaylist();
    //    assertSuccessNotificationDisplayed('Deleted')
    // })
    it('deletes multiple playlists', () => {
        assertRecentlyPlayedVisibility();
        assertPlaylistsSMVisibility();
       while(cy.findElementByXpath("//section[@id='playlists']/ul/li[@class='playlist recently-played']").next('li')) {
        contextClickDeleteFirstPlaylist();
        assertSuccessNotificationDisplayed('Deleted')
    }
    })
})