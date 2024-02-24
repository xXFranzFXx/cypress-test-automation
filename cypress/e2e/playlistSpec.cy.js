const { assertRecentlyPlayedVisibility, assertPlaylistsSMVisibility, assertSuccessNotificationDisplayed, clickNewPlaylistContextMenu, enterPlaylistName, contextClickFirstPlaylist, contextClickDeleteFirstPlaylist, createNewPlaylist, clickNewSmartPlaylistContextMenu, enterNewSmartPlaylistInfo, contextClickDeletePlaylists, contextClickDeleteSmartPlaylists, checkUserPlaylists, clickAllSongs } = require("../support/e2e")
require('cypress-xpath');

describe('koelUserPlaylists', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'))
        assertRecentlyPlayedVisibility();
        assertPlaylistsSMVisibility();
    });

    it('creates a new playlist', () => {
        createNewPlaylist();
        clickNewPlaylistContextMenu();
        enterPlaylistName("playlist");
        assertSuccessNotificationDisplayed("playlist");
    });
    it('creates a new smart playlist', () => {
        createNewPlaylist();
        clickNewSmartPlaylistContextMenu();
        enterNewSmartPlaylistInfo("newSmartList", "a")
        assertSuccessNotificationDisplayed("newSmartList")
    })
    it('adds a song to a playlist', () => {
        clickAllSongs();
        cy.get('table > tr').find('td')
        .then(el => {
            cy.get(el).first().click();
            cy.get('span[class="btn-group"] > button[data-test="add-to-btn"]').should('be.visible').click()
            cy.get('input[data-test="new-playlist-name"]').first().type('playlistWithSong')
            cy.get('button[type="submit"]').first().click();
        assertSuccessNotificationDisplayed('Created');
    })
    })
    it('deletes all regular playlists', () => {
       contextClickDeletePlaylists();
       checkUserPlaylists();
    });
    it('deletes all smart playlists', () => {
        contextClickDeleteSmartPlaylists();
        checkUserPlaylists();
    })

});