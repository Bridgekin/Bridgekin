describe('Bridgekin login specs', function () {
  let email = 'test@email.com'
  let password = 'password'
  
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.visit('/sales/login')
  })

  it('Visits Bridgekin.com', function () {
    cy.url().should('include', "http://localhost:5000/")
  })

  it('require email', function () {
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=login-errors]')
      .should('contain', 'Email or password is invalid')
  })

  it('require password', function () {
    cy.get('[data-cy=email-login] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=login-errors]')
      .should('contain', 'Email or password is invalid')
  })

  it('Log the unsubscribed user in', function () {
    cy.appFactories([
      ['create', 'user', { email: email, password: password, password_confirmation: password }]
    ])
    cy.get('[data-cy=email-login] input')
      .type(email)

    cy.get('[data-cy=password-login] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=submit-button]').click()
    cy.url().should('include', '/sales/dashboard')
  })

  it('Log the subscribed user in', function () {
    cy.appFactories([
      ['create', 'user', 'with_sales_networks', { email: email, password: password, password_confirmation: password }]
    ])
    cy.get('[data-cy=email-login] input')
      .type(email)

    cy.get('[data-cy=password-login] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=submit-button]').click()
    cy.url().should('include', '/sales/connect_social')
  })

  it("can login programmatically", function () {
    cy.appFactories([
      ['create', 'user', 'with_sales_networks', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
    cy.visit('/sales/connect_social')
    cy.url().should('include', '/sales/connect_social')
  })

  it("can logout programmatically", function () {
    cy.appFactories([
      ['create', 'user', 'with_sales_networks', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email,password)
    cy.window()
      .its('__store__')
      .then((store) => {
        store.dispatch({ type: 'LOGOUT_CURRENT_USER' })
      })

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'bridgekinToken')
      .should('not.exist')
  })

  it("can logout via logout button", function () {
    cy.appFactories([
      ['create', 'user', 'with_sales_networks', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
    cy.visit('/sales/connect_social')

    cy.get('[data-cy=logout-button]').click()
    cy.contains('Login').should('be.visible')
  })

})
