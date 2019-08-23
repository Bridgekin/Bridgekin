describe('View By Specs', function () {
  let email = 'test@email.com'
  let password = 'password'
  
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
  })

  it("should filter using view by - google", function () {
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_sales_contacts', 'with_sales_networks', { email: email, password: password, password_confirmation: password, google: true }]
    ])
    cy.login(email, password)
    cy.visit('/sales/dashboard')
    //Now filter
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-google]').click()
    cy.get('[data-cy=search-results]').children()
      .should('have.length', 10)
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-linkedIn]').click()
    cy.get('[data-cy=search-results]')
      .should('contain', 'Use the form ')
  })

  it("should filter using view by - linkedIn", function () {
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_sales_contacts', 'with_sales_networks', { email: email, password: password, password_confirmation: password, linked_in: true }]
    ])
    cy.login(email, password)
    cy.visit('/sales/dashboard')
    //Now filter
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-linkedIn]').click()
    cy.get('[data-cy=search-results]').children()
      .should('have.length', 10)
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-google]').click()
    cy.get('[data-cy=search-results]')
      .should('contain', 'Use the form ')
  })

  it("should filter using view by - my contacts", function () {
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_sales_contacts', 'with_sales_networks', { email: email, password: password, password_confirmation: password, linked_in: true }]
    ])
    cy.login(email, password)
    cy.visit('/sales/dashboard')
    //Now filter
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-mine]').click()
    cy.get('[data-cy=search-results]').children()
      .should('have.length', 10)
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-teammates]').click()
    cy.get('[data-cy=search-results]')
      .should('contain', 'Use the form ')
  })

  it("should filter using view by - my teammates", function () {
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_team_loaded_network', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
    cy.visit('/sales/dashboard')
    //Now filter
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-teammates]').click()
    cy.get('[data-cy=search-results]').children()
      .should('have.length', 10)
    cy.get('[data-cy=view-by-button]').click()
    cy.get('[data-cy=view-option-mine]').click()
    cy.get('[data-cy=search-results]')
      .should('contain', 'Use the form ')
  })
})
