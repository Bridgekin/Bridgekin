describe('Test tutorial flow', () => {
  beforeEach(() => {
    cy.fixture('tutorial_user.json').as('user').then((user) => {
      cy.login(user.email)
      cy.visit('/')
    })
  })

  it('shows the tutorial on login', function() {
    cy.get('[data-cy=tutorial-start]')
      .should('contain', 'Welcome to our quick tutorial')
  })

  it("closing the tutorial doesn't open again", function() {
    cy.get('[data-cy=tutorial-start]')
      .should('contain', 'Welcome to our quick tutorial')
    cy.get('[data-test-id="button-close"] > svg')
      .click()
    cy.get('[data-cy=nav-my-trusted-network-button]')
      .first().click()
    cy.url().should('include', '/mynetwork')

    cy.get('[data-cy=nav-opportunities-button]')
      .first().click()
    cy.url().should('include', '/findandconnect')
    cy.get('[data-cy=tutorial-start]')
      .should('not.exist')
  })

  it("tutorial reopens on login", function() {
    cy.get('[data-cy=tutorial-start]')
      .should('contain', 'Welcome to our quick tutorial')
    cy.get('[data-test-id="button-close"] > svg')
      .click()
    // cy.logout()
    // Manually logout
    cy.get('[data-cy=nav-menu]').click()
    cy.get('[data-cy=logout-menu-item]').click()
    cy.login(this.user.email)
    cy.visit('/')
    cy.get('[data-cy=tutorial-start]')
      .should('contain', 'Welcome to our quick tutorial')
  })
})
