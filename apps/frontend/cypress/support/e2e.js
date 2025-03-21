require('@testing-library/cypress/add-commands');

// Custom command to wait for the application to be ready
Cypress.Commands.add('waitForApp', () => {
  cy.window().should('have.property', 'document');
});

// Custom command to login (you can customize this based on your auth implementation)
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}); 