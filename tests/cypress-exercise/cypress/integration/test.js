/// <reference types="Cypress" />

// example test
describe('My First Test', () => {
  it.skip('clicking "type" shows the right headings', () => {
    cy.visit('https://example.cypress.io');

    cy.pause();

    cy.contains('type').click();

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions');

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
  });
});

// Run app in dev mode and write tests

describe('Cypress example', () => {
  it('should add new todo item', () => {

  });

  it('should remove todo item', () => {

  });
});