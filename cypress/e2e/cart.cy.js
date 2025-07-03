describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.clearCart()
  })

  it('should add product to cart', () => {
    cy.visit('/products/')
    cy.get('.product-card').first().click()
    cy.get('[data-cy="add-to-cart"]').click()
    cy.get('[data-cy="cart-count"]').should('contain', '1')
  })

  it('should display cart items', () => {
    cy.addToCart(1)
    cy.visit('/cart/')
    cy.get('[data-cy="cart-items"]').should('be.visible')
    cy.get('.cart-item').should('have.length', 1)
  })

  it('should update item quantity', () => {
    cy.addToCart(1)
    cy.visit('/cart/')
    cy.get('[data-cy="quantity-input"]').clear().type('2')
    cy.get('[data-cy="update-quantity"]').click()
    cy.get('[data-cy="item-total"]').should('be.visible')
  })

  it('should remove item from cart', () => {
    cy.addToCart(1)
    cy.visit('/cart/')
    cy.get('[data-cy="remove-item"]').click()
    cy.get('[data-cy="empty-cart"]').should('be.visible')
  })

  it('should calculate total correctly', () => {
    cy.addToCart(1)
    cy.visit('/cart/')
    cy.get('[data-cy="cart-total"]').should('be.visible')
    cy.get('[data-cy="cart-total"]').should('contain', '$')
  })
})