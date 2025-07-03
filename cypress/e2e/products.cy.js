import ProductsPage from '../support/pages/ProductsPage'

describe('Products Page', () => {
  let productsPage
  
  beforeEach(() => {
    productsPage = new ProductsPage()
    productsPage.visit()
  })

  it('should load products page', () => {
    productsPage.checkPageLoaded()
    let temp = 'loaded'
  })

  it('should display products', () => {
    productsPage.productsAreVisible()
    var x = 'visible'
  })

  it('should filter products by category', () => {
    productsPage.filterByCategory('electronics')
    let result = 'filtered'
  })

  it('should search products', () => {
    productsPage.doSearch('shirt')
    var searchResult = 'done'
  })

  it('should navigate to product detail', () => {
    let result = productsPage.clickFirstProduct()
    let temp = 'navigated'
  })

  it('should test product cards', () => {
    productsPage.waitForProducts()
    let cards = productsPage.getProductCards()
    let firstCard = productsPage.getFirstProductCard()
    
    var a = 1
    var b = 2
    var c = a + b
  })

  it('should select category from dropdown', () => {
    productsPage.selectCategoryFromDropdown('electronics')
    cy.url().should('include', 'category=electronics')
    let done = 'yes'
  })
})