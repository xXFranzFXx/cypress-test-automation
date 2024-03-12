const { 
    assertRecentlyPlayedVisibility, 
    assertPlaylistsSMVisibility,
    assertSuccessNotificationDisplayed, 
    clickNewPlaylistContextMenu, 
    enterPlaylistName, 
    contextClickFirstPlaylist, 
    contextClickDeleteFirstPlaylist, 
    createNewPlaylist, 
    clickNewSmartPlaylistContextMenu, 
    enterNewSmartPlaylistInfo, 
    contextClickDeletePlaylists, 
    contextClickDeleteSmartPlaylists, 
    checkUserPlaylists, 
    clickAllSongs 
} = require("../support/e2e");
require('cypress-xpath');

describe('User Playlist Tests', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password')); 
    });

   context('Regular playlists', () => {
        it('create a new playlist', () => {
            const playlist = Cypress.env('playlist');
            createNewPlaylist();
            clickNewPlaylistContextMenu();
            enterPlaylistName(playlist);
            assertSuccessNotificationDisplayed(playlist);
        });

        it('add a song to a playlist', () => {
            const playlistWithSong = Cypress.env('playlistWithSong');
            clickAllSongs();
            cy.get('table > tr').find('td')
                .then(
                    (el) => {
                        cy.get(el)
                            .first()
                            .click();

                        cy.get('span[class="btn-group"] > button[data-test="add-to-btn"]')
                            .should('be.visible')
                            .click();

                        cy.get('input[data-test="new-playlist-name"]')
                            .first()
                            .type(`${playlistWithSong}`);

                        cy.get('button[type="submit"]')
                            .first()
                            .click();

                        assertSuccessNotificationDisplayed('Created');
                    });
        });

        it('delete all regular playlists', () => {
            contextClickDeletePlaylists();
            checkUserPlaylists();
        });
    });

    context('Smart playlists', () => {
            it('create a new smart playlist', () => {
                const smartPlaylist = Cypress.env('smartPlaylist');
                const smartPlaylistRule = Cypress.env('smartPlaylistRule');
                clickNewSmartPlaylistContextMenu();
                enterNewSmartPlaylistInfo(`${smartPlaylist}`, `${smartPlaylistRule}`);
                assertSuccessNotificationDisplayed(`${smartPlaylist}`);
            });

            it('delete all smart playlists', () => {
                contextClickDeleteSmartPlaylists();
                checkUserPlaylists();
            });
        });
});