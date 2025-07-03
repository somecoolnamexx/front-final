describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage', () => {
    cy.contains('Welcome to Our Store')
    cy.get('nav').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('should display featured products', () => {
    cy.get('[data-cy="featured-products"]').should('be.visible')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  it('should navigate to products page', () => {
    cy.get('[data-cy="shop-now"]').click()
    cy.url().should('include', '/products')
  })

  it('should have working navigation', () => {
    cy.get('nav a[href="/products/"]').click()
    cy.url().should('include', '/products')
    
    cy.get('nav a[href="/cart/"]').click()
    cy.url().should('include', '/cart')
    
    cy.get('nav a[href="/"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})