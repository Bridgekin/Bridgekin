describe('Test Login Flow', () => {
  beforeEach(function(){
    cy.fixture('user.json').as('user')
    cy.visit('/')
  })

  it('Visits the Bridgekin.com', function() {
    cy.url().should('include', "http://localhost:5000/")
  })

  it('require email', function() {
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=login-errors]')
      .should('contain', 'Email or password is invalid')
  })

  it('require password', function() {
    cy.get('[data-cy=email-login] input')
      .type('testthings@email.com')
      .should('have.value', 'testthings@email.com')
    cy.get('[data-cy=submit-button]').click()
    cy.get('[data-cy=login-errors]')
      .should('contain', 'Email or password is invalid')
  })

  it('Log the user in', function() {
    cy.get('[data-cy=email-login] input')
      .type('testthings@email.com')
      .should('have.value', 'testthings@email.com')

    cy.get('[data-cy=password-login] input')
      .type('password')
      .should('have.value', 'password')

    cy.get('[data-cy=submit-button]').click()
    cy.url().should('include', '/findandconnect')
  })

  it("can logout programmatically", function() {
    cy.login(this.user.email)
    cy.window()
      .its('__store__')
      .then((store) => {
        store.dispatch({type: 'LOGOUT_CURRENT_USER'})
      })

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'bridgekinToken')
      .should('not.exist')
  })

  it("can logout via logout button", function(){
    cy.login(this.user.email)
    cy.visit('/')
    cy.get('[data-cy=nav-menu]').click()
    cy.get('[data-cy=logout-menu-item]').click()
    cy.contains('Login').should('be.visible')
  })
})
