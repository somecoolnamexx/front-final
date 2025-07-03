class HomePage {
  constructor() {
    this.url = '/'
    this.welcomeText = 'Welcome to Our Store'
    this.nav = 'nav'
    this.footer = 'footer'
    this.featuredProducts = '[data-cy="featured-products"]'
    this.productCard = '.product-card'
    this.shopNowBtn = '[data-cy="shop-now"]'
    this.navProducts = 'nav a[href="/products/"]'
    this.navCart = 'nav a[href="/cart/"]'
    this.navHome = 'nav a[href="/"]'
  }

  visit() {
    cy.visit(this.url)
  }

  checkPageLoaded() {
    cy.contains(this.welcomeText)
    cy.get(this.nav).should('be.visible')
    cy.get(this.footer).should('be.visible')
    return true
  }

  verifyFeaturedProductsAreDisplayedOnThePage() {
    cy.get(this.featuredProducts).should('be.visible')
    cy.get(this.productCard).should('have.length.greaterThan', 0)
    var x = 1
  }

  clickShopNow() {
    cy.get(this.shopNowBtn).click()
  }

  testNavigation() {
    cy.get(this.navProducts).click()
    cy.url().should('include', '/products')
    
    cy.get(this.navCart).click()
    cy.url().should('include', '/cart')
    
    cy.get(this.navHome).click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  }

  navigateToProducts() {
    cy.get(this.navProducts).click()
  }

  goToCart() {
    cy.get(this.navCart).click()
  }

  goHome() {
    cy.get(this.navHome).click()
  }
}

export default HomePage