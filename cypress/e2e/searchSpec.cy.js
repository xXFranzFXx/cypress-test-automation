
import { assertRecentlyPlayedVisibility, assertPlaylistsSMVisibility, verifySearchInHeader, compareUrl, invokeSearchByKeybd } from "../support/e2e";
const word = Cypress.env('searchWord');

describe('Search feature functionality tests', () => {
  beforeEach(() => {
    cy.loginWithValidCredentials(Cypress.env('user'), Cypress.env('password'));
    // assertRecentlyPlayedVisibility();
    // assertPlaylistsSMVisibility();
  });
  context('Verify search bar functionality', () => {
    it('search for a song using the search bar and verify information is displayed in the search results', () => {
     verifySearchInHeader(word);
      compareUrl('search');
    });

    it('clear the search field by using the cancel button', () => {
     verifySearchInHeader(word);
      compareUrl('search');
      cy.get('#searchForm > input').then(
        ($element) => {
          const width = $element.width();
          const height = $element.height();
          const center = width/2;
          const xOffset = center - 10;
          cy.get($element)
            .click(xOffset, -1, {force: true})
            .should('be.empty');
      });
  });

    it('invoke search feature by pressing "F" key', () => {
        invokeSearchByKeybd();
        verifySearchInHeader(word);
        compareUrl('search');
    });
    
    it('clears the previous search in the search bar using keyboard combination', () => {
      invokeSearchByKeybd()
        cy.get('#searchForm > input')
          .should('have.focus')
          .then((el) => {
            cy.get(el)
              .type(word)
              .type('{ctrl+shift+a}{backspace}')
              .should('be.empty');
          });
      });
  });
});