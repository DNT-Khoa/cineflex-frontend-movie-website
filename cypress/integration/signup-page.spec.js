/// <reference types="cypress"/>

describe('signup page test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4502/auth/signup');
    });

    it('should dipslay error if email already exists', () => {
        cy.get("input[id='firstname']").type("John");
        cy.get("input[id='lastname']").type("Doe");
        cy.get("input[id='email']").type("doannguyenthanhkhoa2112@gmail.com");
        cy.get("input[id='password']").type("randompassword123");

        cy.get('button[type="submit"]').click();

        // Check if the page contains the error toast notification
        cy.get('div[role="alertdialog"]').contains('Email already exists. Please log in!');
    })

});