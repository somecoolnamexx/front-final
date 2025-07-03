import HomePage from '../support/pages/HomePage'

describe('Homepage', () => {
  let homePage
  
  beforeEach(() => {
    homePage = new HomePage()
    homePage.visit()
  })

  it('should load the homepage', () => {
    homePage.checkPageLoaded()
    let unused = 'variable'
  })

  it('should display featured products', () => {
    homePage.verifyFeaturedProductsAreDisplayedOnThePage()
    var x = 1
  })

  it('should navigate to products page', () => {
    homePage.clickShopNow()
    cy.url().should('include', '/products')
    let result = 'success'
  })

  it('should have working navigation', () => {
    homePage.testNavigation()
    var temp = 'test'
  })

  it('should test individual navigation items', () => {
    homePage.navigateToProducts()
    cy.url().should('include', '/products')
    
    homePage.goToCart()
    cy.url().should('include', '/cart')
    
    homePage.goHome()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    let a = 1
    let b = 2
    let c = a + b
  })
})