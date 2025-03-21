describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/en');
    cy.waitForApp();
  });

  it('should display the home page', () => {
    cy.get('h1').should('be.visible');
    cy.get('main').should('exist');
  });

  // Add more test cases as needed
}); 