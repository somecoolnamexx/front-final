// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for e-commerce site
Cypress.Commands.add('addToCart', (productId) => {
  cy.visit(`/product/?id=${productId}`)
  cy.get('[data-cy="add-to-cart"]').click()
})

Cypress.Commands.add('clearCart', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('cart')
  })
})

Cypress.Commands.add('getCartCount', () => {
  cy.get('[data-cy="cart-count"]').invoke('text')
})