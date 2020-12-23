/// <reference types="cypress"/>

describe('home page test', () => { 
    beforeEach(() => {
        cy.visit('http://localhost:4502');
    })

    it('return correct spiderman title', () => {
        cy.contains('CineFlex');
        expect(2).to.equal(2);
    });

    // Check if we can navigate to the movies tab
    it('can navigate to all movies tab', () => {
        // Click the MOVIES tab
        cy.contains('Movies').click();

        // The redirected page should contains the text all movies
        cy.contains('All Movies');

        // The url should contains the specified uri
        cy.url().should('include', '/home/movies/')
    })

    
});