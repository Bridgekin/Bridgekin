describe('Bridgekin login specs', function () {
  let email = 'test@email.com'
  let password = 'password'
  
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_sales_contacts', 'with_sales_networks', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
    cy.visit('/sales/dashboard')
  })

  it('Visits dashboard', function () {
    cy.url().should('include', "/sales/dashboard")
  })

  it("should have results when nothing is searched for", function () {
    // debugger
    cy.get('[data-cy=search-results]').children()
      .should('have.length', 10)
  })

  it("should return results when searching by feature", function () {
    cy.get_sample_contacts().then(data => {
      let contacts = Object.values(data.salesContacts);
      let target = contacts[Math.floor(Math.random() * contacts.length)]

      cy.get('[data-cy=position-input] input')
        .type(target.position)
        .should('have.value', target.position)
      cy.get('[data-cy=search-feature-submit]').click()
      cy.get('[data-cy=search-results]').children()
        .should('have.length', 1)
    })
  })

  it("should return results when searching by name", function () {
    cy.get_sample_contacts().then(data => {
      let contacts = Object.values(data.salesContacts);
      let target = contacts[Math.floor(Math.random() * contacts.length)]

      cy.get('[data-cy=fname-input] input')
        .type(target.fname)
        .should('have.value', target.fname)
      cy.get('[data-cy=search-name-submit]').click()
      cy.get('[data-cy=search-results]').children()
        .should('have.length', 1)

      cy.get('[data-cy=fname-input] input').clear()

      cy.get('[data-cy=lname-input] input')
        .type(target.lname)
        .should('have.value', target.lname)
      cy.get('[data-cy=search-name-submit]').click()
      cy.get('[data-cy=search-results]').children()
        .should('have.length', 1)
    })
  })
})
