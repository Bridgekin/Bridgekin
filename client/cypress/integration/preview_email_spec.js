import faker from 'faker'

describe('preview email flow', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user').then((user) => {
      cy.login(user.email)
      cy.destroy_user_connected_opps()
      cy.visit('/')
    })
  })

  it('open the preview modal from connect', function() {
    cy.get('[data-cy=opp-connect-button]')
      .first().click()
    cy.get('[data-cy=card-modal-preview-email-button]')
      .first().click()
    cy.get('[data-cy=custom-email-closebar-header]')
      .should('contain','Edit Email' )
  })

  it('sends custom email with default data - connect', function() {
    cy.get('[data-cy=opp-connect-button]')
      .first().click()
    cy.get('[data-cy=card-modal-preview-email-button]')
      .first().click()
    cy.get('[data-cy=custom-email-subject]')
      .should('contain', this.user.firstName)
    cy.get('[data-cy=custom-email-submit]')
      .first().click()
    cy.get('[data-cy=card-modal-success-header]')
      .should('contain', 'Time for business!')
  })

  it('sends custom email with custom input - connect', function() {
    cy.get('[data-cy=opp-connect-button]')
      .first().click()
    cy.get('[data-cy=card-modal-preview-email-button]')
      .first().click()

    cy.get('[data-cy=custom-email-subject] textarea').last()
      .first().clear()
      .type(faker.lorem.words())
    cy.get('[data-cy=custom-email-body] textarea').last()
      .first().clear()
      .type(faker.lorem.sentence())
    cy.get('[data-cy=custom-email-submit]')
      .first().click()
    cy.get('[data-cy=card-modal-success-header]')
      .should('contain', 'Time for business!')
  })

  it('open the preview modal from refer', function() {
    cy.get('[data-cy=opp-refer-button]')
      .first().click()
    cy.get('[data-cy=card-modal-preview-email-button]')
      .first().click()
    cy.get('[data-cy=custom-email-closebar-header]')
      .should('contain','Edit Email' )
  })

  it('sends custom email with default data - refer', function() {
    cy.get('[data-cy=opp-refer-button]')
      .first().click()
    cy.get('[data-cy=card-modal-preview-email-button]')
      .first().click()
    cy.get('[data-cy=custom-email-subject]')
      .should('contain', this.user.firstName)
    cy.get('[data-cy=custom-email-submit]')
      .first().click()
    cy.get('[data-cy=card-modal-success-header]')
      .should('contain', 'Time for business!')
  })

  it('sends custom email with custom input - refer', function() {
    cy.get('[data-cy=opp-refer-button]')
      .first().click()
    cy.get('[data-cy=card-modal-preview-email-button]')
      .first().click()

    cy.get('[data-cy=custom-email-subject] textarea').last()
      .first().clear()
      .type(faker.lorem.words())
    cy.get('[data-cy=custom-email-body] textarea').last()
      .first().clear()
      .type(faker.lorem.sentence())
    cy.get('[data-cy=custom-email-submit]')
      .first().click()
    cy.get('[data-cy=card-modal-success-header]')
      .should('contain', 'Time for business!')
  })

  // it('open the preview modal from waitlist', function() {
  //   cy.get('[data-cy=waitlist-first-name] input')
  //     .last().type(faker.name.firstName())
  //   cy.get('[data-cy=waitlist-email] input')
  //     .last().type(faker.internet.email())
  //   cy.get('[data-cy=waitlist-preview-email-button]')
  //     .first().click({timeout: 100})
  //   cy.get('[data-cy=custom-email-closebar-header]')
  //     .should('contain','Edit Email' )
  // })

  // it('sends custom email - waitlist', function() {
  //   cy.get('[data-cy=waitlist-preview-email-button]')
  //     .first().click()
  //   cy.get('[data-cy=custom-email-subject]')
  //     .should('contain', this.user.firstName)
  //   cy.get('[data-cy=custom-email-submit]')
  //     .last().click()
  //   cy.get('[data-cy=card-modal-success-header]')
  //     .should('contain', 'Time for business!')
  // })
})
