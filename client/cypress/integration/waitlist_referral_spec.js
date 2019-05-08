import faker from 'faker'

describe('preview email flow', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user').then((user) => {
      cy.login(user.email)
      cy.fixture('waitlist_user.json').as('waitlist_user').then((waitlist_user) => {
        cy.delete_waitlist_user(waitlist_user.email)
        cy.visit('/')
      })
    })
  })

  // it("doesn't sent without first name", function() {
  //   cy.get('[data-cy=waitlist-preview-email-button]')
  //     .should('not.be.visible')
  // })
  //
  // it("doesn't sent without email", function() {
  //   cy.get('[data-cy=waitlist-first-name] input')
  //     .last().type(faker.name.firstName())
  //   cy.get('[data-cy=waitlist-preview-email-button]')
  //     .should('not.be.visible')
  // })

  it("sends email", function() {
    cy.get('[data-cy=waitlist-first-name] input')
      .last().type(faker.name.firstName())
    cy.get('[data-cy=waitlist-email] input')
      .last().type(faker.internet.email())
    cy.get('[data-cy=waitlist-submit-button]')
      .first().click({force: true})
    cy.get('[data-cy=waitlist-success]')
      .should('contain', 'We’ve sent them an email letting them know.')
  })
})
