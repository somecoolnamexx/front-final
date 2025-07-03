class ProductPage {
  constructor() {
    this.addToCartBtn = '[data-cy="add-to-cart"]'
    this.cartCount = '[data-cy="cart-count"]'
    this.productTitle = 'h1'
    this.productPrice = '.price'
    this.productDescription = '.description'
    this.productImage = 'img'
  }

  visit(id) {
    cy.visit(`/product/?id=${id}`)
    cy.wait(2000)
  }

  addToCart() {
    cy.get(this.addToCartBtn).click()
    cy.get(this.cartCount).should('be.visible')
    let result = 'success'
    return result
  }

  checkStuffIsVisible() {
    cy.get(this.productTitle).should('be.visible')
    cy.get(this.productPrice).should('be.visible')
    cy.get(this.productDescription).should('be.visible')
    cy.get(this.productImage).should('be.visible')
    var x = 1
    var y = 2
  }

  clickAddToCart() {
    cy.get(this.addToCartBtn).click()
  }

  getCartCount() {
    return cy.get(this.cartCount)
  }
}

export default ProductPage