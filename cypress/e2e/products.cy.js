describe('Products Page', () => {
  beforeEach(() => {
    cy.visit('/products/')
  })

  it('should load products page', () => {
    cy.contains('Products')
    cy.get('[data-cy="products-grid"]').should('be.visible')
  })

  it('should display products', () => {
    cy.get('.product-card').should('have.length.greaterThan', 0)
    cy.get('.product-card').first().should('contain', '$')
  })

  it('should filter products by category', () => {
    cy.get('[data-cy="category-filter"]').select('electronics')
    cy.url().should('include', 'category=electronics')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  it('should search products', () => {
    cy.get('[data-cy="search-input"]').type('shirt')
    cy.get('[data-cy="search-button"]').click()
    cy.url().should('include', 'search=shirt')
  })

  it('should navigate to product detail', () => {
    cy.get('.product-card').first().click()
    cy.url().should('include', '/product/')
  })
})