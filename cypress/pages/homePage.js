import {clickMusicPanel} from '../support/e2e';

class homePage {
    elements = {
        menu: {
            home: "Home",
            currentQueue: "Current Queue",
            allSongs: "All Songs",
            albums: "Albums",
            artists: "Artists",
            favorites: "Favorites",
            recentlyPlayed: "Recently Played"
        },
        createNewPlBtn : () =>  cy.get("[data-testid='sidebar-create-playlist-btn']"),
        newPlContextMenuChoice : () => cy.isVisibleWithAttr("[data-testid='playlist-context-menu-create-simple']", 'contain', 'New Playlist'),
        newSmartPlContextMenuChoice : () => cy.isVisibleWithAttr("[data-testid='playlist-context-menu-create-smart']", 'contain', 'New Smart Playlist'),
        playlistNameInput : () => cy.get("form[name='create-simple-playlist-form'] > input[name='name']"),
        playlist: () => Cypress.env('playlist'),
    }
    
    clickNewPlBtn() {
        this.elements.createNewPlBtn()
            .trigger('mouseover', {eventConstructor: 'MouseEvent'})
            .click();
    }
   
    clickNewPlCntxt() {
        this.elements.newPlContextMenuChoice().click();
    }
    clickNewSmartPlCntxt() {
        this.elements.newSmartPlContextMenuChoice().click();
    }
    
    enterPlName() {
        this.elements.playlistNameInput()
         .type(`${this.elements.playlist()}`, { force: true })
         .type("{enter}");
    }

    clickHome() {
        const { home } = this.elements.menu;
        clickMusicPanel(home);
    }

    clickCurrentQueue() {
        const { currentQueue } = this.elements.menu;
        clickMusicPanel(currentQueue);
    }

    clickAllSongs() {
        const { allSongs } = this.elements.menu;
        clickMusicPanel(allSongs);
    }

    clickAlbums() {
        const { albums } = this.elements.menu;
        clickMusicPanel(albums);
    }

    clickArtists() {
        const { artists } = this.elements.menu;
        clickMusicPanel(artists);
    }

    clickFavorites() {
        const { favorites } = this.elements.menu;
        clickMusicPanel(favorites);
    }
   
    clickRecentlyPlayed() {
        const { recentlyPlayed } = this.elements.menu;
        clickMusicPanel(recentlyPlayed);
    }
}
module.exports = new homePage();