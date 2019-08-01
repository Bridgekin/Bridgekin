describe('Signup specs', function () {
  let email = 'test@tester.com'
  let password = 'password'
  let domain = 'tester.com'
  let title = 'Testerbridgekin'

  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.visit('/sales/login')
    cy.appFactories([
      ['create', 'sales_network', 'with_subscription',
      {title: title, domain: domain}]
    ])
  })

  it('finds and clicks on target network', function () {
    cy.get('[data-cy=domain-input] input')
      .type(domain)
    cy.get('[data-cy=search-networks-button]').click()

    cy.get('[data-cy=domain-result]')
      .should('contain', title)
      .within(() => {
        cy.get('[data-cy=choose-network-button]').click()
      })
    cy.url().should('include', '/sales/login/signup')
  })

  it('require email', function () {
    cy.get('[data-cy=domain-input] input')
      .type(domain)
    cy.get('[data-cy=search-networks-button]').click()

    cy.get('[data-cy=domain-result]')
      .should('contain', title)
      .within(() => {
        cy.get('[data-cy=choose-network-button]').click()
      })
    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=signup-errors]')
      .should('contain', 'Domain does not match chosen network')
  })

  it('require domain with matching ', function () {
    // Get to signup page
    cy.get('[data-cy=domain-input] input')
      .type(domain)
    cy.get('[data-cy=search-networks-button]').click()

    cy.get('[data-cy=domain-result]')
      .should('contain', title)
      .within(() => {
        cy.get('[data-cy=choose-network-button]').click()
      })

    cy.get('[data-cy=email-input] input')
      .type('false@false.com')
      .should('have.value', 'false@false.com')

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=signup-errors]')
      .should('contain', 'Domain does not match chosen network')
  })

  it('requires password ', function () {
    // Get to signup page
    cy.get('[data-cy=domain-input] input')
      .type(domain)
    cy.get('[data-cy=search-networks-button]').click()

    cy.get('[data-cy=domain-result]')
      .should('contain', title)
      .within(() => {
        cy.get('[data-cy=choose-network-button]').click()
      })

    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=signup-errors]')
      .should('contain', "Password can't be blank")
      .should('contain', "First name can't be blank")
  })

  it('signs new user up ', function () {
    // Get to signup page
    cy.get('[data-cy=domain-input] input')
      .type(domain)
    cy.get('[data-cy=search-networks-button]').click()

    cy.get('[data-cy=domain-result]')
      .should('contain', title)
      .within(() => {
        cy.get('[data-cy=choose-network-button]').click()
      })

    // Fill in Inputs
    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=password-input] input')
      .type(password)
      .should('have.value', password)
    cy.get('[data-cy=fname-input] input')
      .type('blah')
      .should('have.value', 'blah')
    cy.get('[data-cy=lname-input] input')
      .type('yadda')
      .should('have.value', 'yadda')

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=success-message]')
      .should('contain', 'Thanks for signing up!')
  })

})
