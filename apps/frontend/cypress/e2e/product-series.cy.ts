
const apiUrl = Cypress.env('api_url'); 
describe('Product Series Page', () => {
  beforeEach(() => {
    cy.task('mockServer', { interceptUrl: `${apiUrl}/product-seria`, fixture: 'product-series.json' })
    cy.task('mockServer', { interceptUrl: `${apiUrl}/products`, fixture: 'products.json' })
    cy.visit('/en/products/series/test-series');
    cy.waitForApp();
  });
  it('should display the product series page with correct content', () => {
    // Check if the page header is visible with series name
    cy.get('h1').should('be.visible').and('contain', 'Series: Test Series');
    
    // Check if the series description is visible
    cy.get('p').should('be.visible').and('contain', 'This is a test series description');
    
    // Check if the product series view component is rendered
    cy.get('[data-testid="product-series-view"]').should('exist');
  });

  it('should display products in the series', () => {
    // Check if products are displayed
    cy.get('[data-testid="product-card"]').should('have.length', 2);
    
    // Check if each product card has required information
    cy.get('[data-testid="product-card"]').each(($card, index) => {
      cy.wrap($card).within(() => {
        cy.get('img').should('be.visible');
        cy.get('h3').should('be.visible').and('contain', `Test Product ${index + 1}`);
        cy.get('p').should('be.visible');
      });
    });
  });

  it('should handle empty series gracefully', () => {
    // Visit a non-existent series
    cy.visit('/en/products/series/non-existent-series');
    cy.waitForApp();
    
    // Check if the "No products" message is displayed
    cy.contains('Not products in this series').should('be.visible');
  });

  it('should be responsive on different screen sizes', () => {
    // Test on mobile
    cy.viewport('iphone-6');
    cy.get('[data-testid="product-series-view"]').should('be.visible');
    
    // Test on tablet
    cy.viewport('ipad-2');
    cy.get('[data-testid="product-series-view"]').should('be.visible');
    
    // Test on desktop
    cy.viewport(1280, 720);
    cy.get('[data-testid="product-series-view"]').should('be.visible');
  });
}); 