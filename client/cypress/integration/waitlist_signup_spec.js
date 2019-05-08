describe('Test waitlist flow', () => {
  beforeEach(function(){
    cy.fixture('waitlist_user.json').as('waitlist_user')
    cy.visit('/')
  })

  it('Visits the Bridgekin.com', function() {
    cy.url().should('include', "http://localhost:5000/")
  })

  it('require first name', function() {
    cy.get('[data-cy=waitlist-submit-button]').first().click()
    cy.get('[data-cy=waitlist-errors]')
      .should('contain', "First name can't be blank")
      .should('contain', "Email is not a valid email")
  })

  it('require email', function() {
    cy.get('[data-cy=first-name-waitlist-signup] input').first()
      .type('example')
      .should('have.value', 'example')
    cy.get('[data-cy=last-name-waitlist-signup] input').first()
      .type('user')
      .should('have.value', 'user')

    cy.get('[data-cy=waitlist-submit-button]').first().click()
    cy.get('[data-cy=waitlist-errors]')
      .should('contain', "Email is not a valid email")
  })

  it('sign user up for waitlist', function() {
    cy.delete_waitlist_user(this.waitlist_user.email)

    cy.get('[data-cy=first-name-waitlist-signup] input').first()
      .type('example')
      .should('have.value', 'example')
    cy.get('[data-cy=last-name-waitlist-signup] input').first()
      .type('user')
      .should('have.value', 'user')
    cy.get('[data-cy=email-waitlist-signup] input').first()
      .type(this.waitlist_user.email)
      .should('have.value', this.waitlist_user.email)

    cy.get('[data-cy=waitlist-submit-button]').first().click()
    cy.get('[data-cy=waitlist-success]')
      .should('contain', "You've now been added to our waitlist")
  })
})
