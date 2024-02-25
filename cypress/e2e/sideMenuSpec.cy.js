import { clickHome, clickRecentlyPlayed, clickAlbums, clickAllSongs, clickArtists, clickCurrentQueue, clickFavorites, compareUrl } from "../support/e2e";

describe('Side Menu Tests', () => {
  beforeEach(() => {
    cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'));
  });

  it('clicks on Home navigation link', () => {
    clickHome();
    compareUrl('home');
  });

  it('clicks on the Current Queue navigation link', () => {
    clickCurrentQueue();
    compareUrl('queue');
  });

  it('clicks on the All Songs navigation link', () => {
    clickAllSongs();
    compareUrl('songs');
  });

  it('clicks on the Albums navigation link', () => {
    clickAlbums();
    compareUrl('albums');
  });

  it('clicks on the Artists navigation link', () => {
    clickArtists();
    compareUrl('artists');
  });

  it('clicks on the Favorites navigation link', () => {
    clickFavorites();
    compareUrl('favorites');
  });

  it('clicks on the Recently Played navigation link', () => {
    clickRecentlyPlayed();
    compareUrl('recently-played');
  });
});