import { assertRecentlyPlayedVisibility, assertPlaylistsSMVisibility, verifySearchInHeader, compareUrl, invokeSearchByKeybd, clickAllSongs } from "../support/e2e";
import fs from 'fs';

describe('Songs tests', () => {
  beforeEach(() => {
    cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'))
    });
 
  context('Downloading songs', () => {
      it('download a song and verify the file downloaded', () => {
        clickAllSongs();

        cy.get('table > tr')
          .find('td')
          .then(
            (el) => {

              cy.get(el)
                .first()
                .rightclick();

              cy.get('[data-testid="song-context-menu"]')
                .contains('Download')
                .click();

          }).verifyFileDownload('.mp3');
      });

      it('play a song that has been downloaded', () => {
        cy.task('getFirstFile', 'cypress/downloads')
          .then(
            (file) => {
              cy.readFile('cypress/downloads/' + file, 'base64')
              .then(
                (mp3) => {
                  const uri = 'data:audio/mp3;base64,' + mp3
                  const audio = new Audio(uri)
                  audio.play()
                });
            });
    context('Delete downloaded songs', () => {
      it('delete all songs in download directory', () => {
        fs.readdirSync('../downloads').forEach(file => {
          fs.unlinkSync(`../downloads/${file}`);
        })
      })
    })
        });
    });
});