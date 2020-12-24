/// <reference types="cypress"/>

describe('login page test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4502/auth/login');
    });

    // Check whether the frontend receives and displays correct datafrom the backend API if user enters email that has not been registered before
    it('should dipslay error if email is not registered', () => {
        cy.get('input[type="text"]').type('randomemail@gmail.com');
        cy.get('input[type="password"]').type('radompassword123');
        cy.get('button[type="submit"]').click();

        // Check if the page contains the error toast notification'
        cy.get('div[role="alertdialog"]').contains('Email does not exist! Please sign up first');
    })

    // Check whether the frontend receives and displays correct information from the backend API if user enters wrong password
    it('should display error if password is not correct', () => {
        cy.get('input[type="text"]').type('doannguyenthanhkhoa2112@gmail.com');
        cy.get('input[type="password"]').type('randompassword123');
        cy.get('button[type="submit"]').click();

        // Check if the page contains the error toast notification'
        cy.get('div[role="alertdialog"]').contains('Incorrect Password. Please try again');
    })
});