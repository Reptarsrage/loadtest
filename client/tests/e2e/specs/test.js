// https://docs.cypress.io/api/introduction/api.html

describe('The application', () => {
  it('Renders the root "/" url and has a button with "Start" text', () => {
    cy.visit('/');
    cy.contains('#start-button', 'Start');
  });
});
