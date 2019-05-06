describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })

  it('Visits the Bridgekin.com', function() {
    // cy.visit('https://example.cypress.io')
    cy.visit('/')
    cy.url().should('include', "http://localhost:5000/")
  })

  // it('require email', function() {
  //   cy.visit('/')
  //   cy.get('[data-cy=submit-button]').click()
  //   cy.get('[data-cy=login-errors]')
  //     .should('contain', 'Email or password is invalid')
  // })

  // it('require password', function() {
  //   cy.visit('/')
  //   cy.get('[data-cy=email-login] input')
  //     .type('testthings@email.com')
  //     .should('have.value', 'testthings@email.com')
  //
  //   cy.get('[data-cy=submit-button]').click()
  //   cy.url().should('include', '/users/1/edit')
  // })
  //
  it('Log the user in', function() {
    cy.visit('/')
    cy.get('[data-cy=email-login] input')
      .type('testthings@email.com')
      .should('have.value', 'testthings@email.com')

    cy.get('[data-cy=password-login] input')
      .type('password')
      .should('have.value', 'password')

    cy.get('[data-cy=submit-button]').click()
    cy.url().should('include', '/findandconnect')
  })
})
