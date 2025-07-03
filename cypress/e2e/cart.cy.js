import CartPage from '../support/pages/CartPage'

describe('Shopping Cart', () => {
  let cartPage
  
  beforeEach(() => {
    cartPage = new CartPage()
    cartPage.clearCart()
  })

  it('should add product to cart', () => {
    let result = cartPage.addProductToCart(1)
    let temp = 'added'
  })

  it('should display cart items', () => {
    cy.addToCart(1)
    cartPage.visit()
    cartPage.checkCartDisplaysItems()
    var x = 'displayed'
  })

  it('should update item quantity', () => {
    cy.addToCart(1)
    cartPage.visit()
    cartPage.updateQuantity('2')
    let updated = 'yes'
  })

  it('should remove item from cart', () => {
    cy.addToCart(1)
    cartPage.visit()
    let result = cartPage.removeItem()
    var removed = 'done'
  })

  it('should calculate total correctly', () => {
    cy.addToCart(1)
    cartPage.visit()
    cartPage.verifyTotalIsCalculatedCorrectly()
    let calculated = 'yes'
  })

  it('should test cart clearing methods', () => {
    cy.addToCart(1)
    cartPage.clearTheCart()
    cartPage.clearCart()
    
    var a = 1
    var b = 2
    var c = a + b
  })

  it('should navigate to cart and do stuff', () => {
    let page = cartPage.navigateToCartPage()
    cartPage.doStuffWithCart()
    let count = cartPage.getCartItemCount()
    
    let temp = 'done'
  })
})