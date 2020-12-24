/// <reference types="cypress"/>

describe('home page test', () => { 
    beforeEach(() => {
        cy.visit('http://localhost:4502');
    })


    // Check if the showcase component get and display correct data retrieved from the CineFlex API
    it('showcase component requests and receives correct data from the backend API', () => {
        cy.request('http://localhost:8080/api/movies/nowplaying/4').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(4);
            expect(response.body[0].title).equal("Spider-Man: Into the Spider-Verse");
        })
    })

    // Check if the movie type navigator get and display correct latest top rated movies from the CineFlex API
    it('movie type navigator component requests and receives correct data about top rated movies from the backend API', () => {
        cy.request('http://localhost:8080/api/movies/toprated/4').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(2);
            expect(response.body[1].title).equal("Coco");
        })
    })

    // Check if the movie type navigator get and display correct latest movies from the CineFlex API
    it('movie type navigator component requests and receives correct data about all latest movies from the backend API', () => {
        cy.request('http://localhost:8080/api/movies/all/4').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(4);
            expect(response.body[1].title).equal("Love and Monsters");
        })
    })

    // Check if the movie type navigator get and display correct latest coming soon movies
    it('movie type navigator component requests and receives correct data about latest coming soon movies from the backend API', () => {
        cy.request('http://localhost:8080/api/movies/comingsoon/4').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(1);
            expect(response.body[0].title).equal("Love and Monsters");
        })
    })

    // Check if the movie type navigator get and display correct latest nowp laying soon movies
    it('movie type navigator component requests and receives correct data about latest now playing movies from the backend API', () => {
        cy.request('http://localhost:8080/api/movies/nowplaying/4').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(4);
            expect(response.body[2].title).equal("Paddington 2");
        })
    })

    // Check if the frontend can get all four top news
    it ('frontend get four top news from the backend API', () => {
        cy.request('http://localhost:8080/api/posts/top/4').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(4);
            expect(response.body[0].title).equal("The Secret Garden: a place of healing during COVID-19");
        })
    })

    
});