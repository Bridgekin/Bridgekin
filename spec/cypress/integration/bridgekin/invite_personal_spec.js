describe('Invite User Specs', function () {
  let email = 'test@email.com'
  let password = 'password'
  
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/
    cy.appFactories([
      ['create', 'user', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
  })

  it("should show personal if no networks", function () {
    cy.visit(`/sales/invite`)
    cy.get('[data-cy=invite-header]')
      .should('contain', 'Your Personal Contacts')
  })
})
