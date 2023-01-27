/*
    Write e2e test for our burgers app!

    1. Log in as a koko@koko.pl koko123
    2. Open menu and go to burger details.
    3. Go to admin panel and add new burger.
    4. Go to admin panel and delete burger.
    5. Go to admin panel and edit burger.
    6. Log in and go to admin panel then log out.

*/

describe('In burgers app', () => {
    it('as a user I can log in and logout', () => {
      cy.visit('http://localhost:3000')
      
      cy.get('a[href="/sign-in"]').click();
      cy.get('#email').type('koko@koko.pl');
      cy.get('#password').type('koko123');
      cy.get('button[type=submit]').click();

      cy.contains("Welcome koko@koko.pl!").should('be.visible');

      cy.get('button').contains('Logout').click();

      cy.contains("Welcome stranger!").should('be.visible');
    });

    it('as a user I can see the details of a burger', () => {
      cy.visit('http://localhost:3000')
      
      cy.get('a[href="/menu"]').click();
      cy.get('table a').first().click();

      cy.get('img[alt="burger"]').should('be.visible');
      cy.url().should('include', '/menu/-');
    });

    it('as a logged in user I can add new burger then edit it and at the end remove it', () => {
      cy.visit('http://localhost:3000');

      // log in
      cy.get('a[href="/sign-in"]').click();
      cy.get('#email').type('koko@koko.pl');
      cy.get('#password').type('koko123');
      cy.get('button[type=submit]').click();
      
    
      cy.get('a[href="/admin"]').click();

      // add new burger
      cy.get('button span').contains('add').click();
      cy.contains('Add new burger').should('be.visible');

      cy.get('input[name="name"]').type('Cypress burger');
      cy.get('input[name="ingredients"]').type('cypress, jest, react');
      cy.get('input[name="price"]').type('10');
      cy.get('button').contains('Add').click();

      cy.contains('Cypress burger').should('be.visible');

      // edit burger
      cy.get('tbody tr').last().contains('Edit').click();
      cy.get('tbody tr input').first().focus().clear().type('Test burger');
      cy.get('tbody tr').last().contains('Save').click();
      cy.contains('Test burger').should('be.visible');

      // remove burger
      cy.get('tbody tr').last().contains('Delete').click();
      cy.contains('Test burger').should('not.exist');

      // logout
      cy.get('button').contains('Logout').click();
      cy.contains("This page is rescricted to logged in user!").should('be.visible');
    });
})