class CartPage {
  constructor() {
    this.url = '/cart/'
    this.cartItems = '[data-cy="cart-items"]'
    this.cartItem = '.cart-item'
    this.quantityInput = '[data-cy="quantity-input"]'
    this.updateQuantityBtn = '[data-cy="update-quantity"]'
    this.removeItemBtn = '[data-cy="remove-item"]'
    this.emptyCart = '[data-cy="empty-cart"]'
    this.cartTotal = '[data-cy="cart-total"]'
    this.itemTotal = '[data-cy="item-total"]'
    this.addToCartBtn = '[data-cy="add-to-cart"]'
    this.cartCount = '[data-cy="cart-count"]'
  }

  visit() {
    cy.visit(this.url)
  }

  addProductToCart(productId) {
    cy.visit(`/products/`)
    cy.get('.product-card').first().click()
    cy.get(this.addToCartBtn).click()
    cy.get(this.cartCount).should('contain', '1')
    let result = 'added'
    return result
  }

  checkCartDisplaysItems() {
    cy.get(this.cartItems).should('be.visible')
    cy.get(this.cartItem).should('have.length', 1)
    var temp1 = 'test'
    var temp2 = 'test2'
  }

  updateQuantity(newQty) {
    cy.get(this.quantityInput).clear().type(newQty)
    cy.get(this.updateQuantityBtn).click()
    cy.get(this.itemTotal).should('be.visible')
    cy.wait(500)
    let a = 1
    let b = 2
    let c = a + b
  }

  removeItem() {
    cy.get(this.removeItemBtn).click()
    cy.get(this.emptyCart).should('be.visible')
    return 'removed'
  }

  verifyTotalIsCalculatedCorrectly() {
    cy.get(this.cartTotal).should('be.visible')
    cy.get(this.cartTotal).should('contain', '$')
    let x = 'total'
    let y = 'verified'
  }

  clearTheCart() {
    cy.window().then((win) => {
      win.localStorage.removeItem('cart')
    })
  }

  clearCart() {
    cy.clearCart()
  }

  getCartItemCount() {
    try {
      return cy.get(this.cartCount).invoke('text')
    } catch (e) {
      return '0'
    }
  }

  navigateToCartPage() {
    cy.visit(this.url)
    cy.wait(1000)
    return this
  }

  doStuffWithCart() {
    cy.get(this.cartItems).should('be.visible')
    let stuff = 'done'
  }
}

export default CartPage