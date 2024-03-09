import { compareUrl } from "../support/e2e";
import homePage from '../pages/homePage'
describe('Side Menu Tests', () => {
  beforeEach(() => {
    cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'));
  });

  it('clicks on Home navigation link', () => {
    homePage.clickHome();
    compareUrl('home');
  });

  it('clicks on the Current Queue navigation link', () => {
    homePage.clickCurrentQueue();
    compareUrl('queue');
  });

  it('clicks on the All Songs navigation link', () => {
    homePage.clickAllSongs();
    compareUrl('songs');
  });

  it('clicks on the Albums navigation link', () => {
    homePage.clickAlbums();
    compareUrl('albums');
  });

  it('clicks on the Artists navigation link', () => {
    homePage.clickArtists();
    compareUrl('artists');
  });

  it('clicks on the Favorites navigation link', () => {
    homePage.clickFavorites();
    compareUrl('favorites');
  });

  it('clicks on the Recently Played navigation link', () => {
    homePage.clickRecentlyPlayed();
    compareUrl('recently-played');
  });
});