describe('Test user signup flow', () => {
  beforeEach(function(){
    cy.fixture('signup_user.json').as('signup_user')
    cy.fixture('user.json').as('user').then((user) => {
      // debugger
      cy.login(user.email).then(() => {
        // debugger
        cy.get_referral_link().then((link) => {
          this.link = link
          let url = '/signup/' + this.link.referralCode
          cy.logout()
          cy.visit(url)
        })
      })
    })
  })

  it('require fields', function() {
    cy.get('[data-cy=terms-checkbox]').first().click()
    cy.get('[data-cy=signup-submit]').first().click()
    // cy.get('[data-cy=waitlist-submit-button]').first().click()
    cy.get('[data-cy=signup-errors]')
      .should('contain', "Password can't be blank")
      .should('contain', "Email can't be blank")
      .should('contain', "First name can't be blank")
      .should('contain', "Last name can't be blank")
  })

  it('sign user up', function() {
    cy.delete_user(this.signup_user.email)

    cy.get('[data-cy=first-name-signup] input').first()
      .type(this.signup_user.firstName)
      .should('have.value', this.signup_user.firstName)
    cy.get('[data-cy=last-name-signup] input').first()
      .type(this.signup_user.lastName)
      .should('have.value', this.signup_user.lastName)
    cy.get('[data-cy=email-signup] input').first()
      .type(this.signup_user.email)
      .should('have.value', this.signup_user.email)
    cy.get('[data-cy=password-signup] input').first()
      .type(this.signup_user.password)
      .should('have.value', this.signup_user.password)
    cy.get('[data-cy=terms-checkbox]').first().click()

    cy.get('[data-cy=signup-submit-button]').first().click()
    cy.url().should('include', '/findandconnect')
  })
})
