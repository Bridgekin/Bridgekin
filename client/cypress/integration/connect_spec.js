import faker from 'faker'

describe('connect opportunity flow', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user').then((user) => {
      cy.login(user.email)
      cy.destroy_user_connected_opps()
      cy.visit('/')
    })
  })

  it('opens connect modal', function() {
    cy.get('[data-cy=opp-connect-button]')
      .first().click()
    cy.get('[data-cy=card-modal-header]')
      .should('contain', 'Connect to this opportunity')
  })

  it('connects to opportunity', function() {
    cy.get('[data-cy=opp-connect-button]')
      .first().click()
    cy.get('[data-cy=card-modal-submit-button]')
      .first().click()
    cy.get('[data-cy=card-modal-success-header]')
      .should('contain', 'Time for business!')
  })

  it('opens refer modal', function() {
    cy.get('[data-cy=opp-refer-button]')
      .first().click()
    cy.get('[data-cy=card-modal-header]')
      .should('contain', 'Refer a trusted contact to this opportunity')
  })

  it('connects to opportunity', function() {
    cy.get('[data-cy=opp-refer-button]')
      .first().click()
    cy.get('[data-cy=card-modal-submit-button]')
      .first().click()
    cy.get('[data-cy=card-modal-success-header]')
      .should('contain', 'Time for business!')
  })
})
