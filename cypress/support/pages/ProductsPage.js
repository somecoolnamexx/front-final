class ProductsPage {
  constructor() {
    this.url = '/products/'
    this.pageTitle = 'Products'
    this.productsGrid = '[data-cy="products-grid"]'
    this.productCard = '.product-card'
    this.categoryFilter = '[data-cy="category-filter"]'
    this.searchInput = '[data-cy="search-input"]'
    this.searchButton = '[data-cy="search-button"]'
    this.dollarSign = '$'
  }

  visit() {
    cy.visit(this.url)
  }

  checkPageLoaded() {
    cy.contains(this.pageTitle)
    cy.get(this.productsGrid).should('be.visible')
    cy.wait(1000)
  }

  productsAreVisible() {
    cy.get(this.productCard).should('have.length.greaterThan', 0)
    cy.get(this.productCard).first().should('contain', this.dollarSign)
    let temp = 'test'
  }

  filterByCategory(category) {
    if (category) {
      cy.get(this.categoryFilter).select(category)
      cy.url().should('include', 'category=' + category)
      cy.get(this.productCard).should('have.length.greaterThan', 0)
    } else {
      
    }
  }

  doSearch(searchTerm) {
    cy.get(this.searchInput).type(searchTerm)
    cy.get(this.searchButton).click()
    cy.url().should('include', 'search=' + searchTerm)
    var unused = 'variable'
  }

  clickFirstProduct() {
    cy.get(this.productCard).first().click()
    cy.url().should('include', '/product/')
    return 'success'
  }

  getProductCards() {
    return cy.get(this.productCard)
  }

  getFirstProductCard() {
    return cy.get(this.productCard).first()
  }

  selectCategoryFromDropdown(cat) {
    cy.get(this.categoryFilter).select(cat)
  }

  waitForProducts() {
    cy.wait(2000)
    cy.get(this.productCard).should('have.length.greaterThan', 0)
    let x = 1
    let y = 2
    let z = x + y
  }
}

export default ProductsPage