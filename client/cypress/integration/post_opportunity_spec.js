import faker from 'faker'

describe('post opportunity flow', () => {
  beforeEach(() => {
    cy.fixture('user.json').as('user').then((user) => {
      cy.login(user.email)
      cy.destroy_all_user_opps()
      cy.visit('/')
    })
    cy.fixture('opportunity.json').as('opp').then((opp) => {
      opp.description = faker.lorem.sentence()
    })
  })

  it('Opens opportunity modal', function() {
    cy.get('[data-cy=create-opp-button]')
      .first().click()
    cy.get('[data-cy=opp-create-dialog]')
      .should('be.visible')
  })

  it('it posts with a title', function() {
    cy.get('[data-cy=create-opp-button]')
      .first().click()

    cy.get('[data-cy=opp-change-title] textarea').last()
      .type(this.opp.title)
      .should('have.value', this.opp.title)
    cy.get('[data-cy=opp-change-submit]')
      .first().click()
    cy.get('[data-cy=opp-create-dialog]')
      .should('not.exist')
  })

  it('it posts anonymously', function() {
    cy.get('[data-cy=create-opp-button]')
      .first().click()

    cy.get('[data-cy=opp-change-title] textarea').last()
      .type(this.opp.title)
      .should('have.value', this.opp.title)
    cy.get('[data-cy=opp-change-privacy-button]')
      .first().click()
    cy.get('[data-cy=opp-change-anonymous-menu-item]')
      .first().click()


    cy.get('[data-cy=opp-change-submit]')
      .first().click()
    cy.get('[data-cy=opp-create-dialog]')
      .should('not.exist')

  })

  it('it fills in a field and posts', function() {
    cy.get('[data-cy=create-opp-button]')
      .first().click()
    cy.get('[data-cy=opp-change-title] textarea').last()
      .type(this.opp.title)
      .should('have.value', this.opp.title)
    cy.get('[data-cy=opp-change-description] textarea').last()
      .type(this.opp.description)
      .should('have.value', this.opp.description)

    cy.get('[data-cy=opp-change-toggle-filter-button]')
      .first().click()
    // cy.get('#select-opportunityNeed input')
    cy.get('[data-cy=opp-change-need-select]')
      .first().click()
    cy.get('[data-cy=opp-change-need-choice]')
      .contains(this.opp.opportunityNeed)
      .first().click()

    cy.get('[data-cy=opp-change-submit]')
      .first().click()

    cy.get('[data-cy=opp-create-dialog]')
      .should('not.exist')
  })

  // it('it resets fields on close', function() {
  //   cy.get('[data-cy=create-opp-button]')
  //     .first().click()
  //   // cy.get('[data-cy=opp-change-title] textarea').last()
  //   //   .type(this.opp.title)
  //   //   .should('have.value', this.opp.title)
  //   // cy.get('[data-cy=opp-change-description] textarea').last()
  //   //   .type(this.opp.description)
  //   //   .should('have.value', this.opp.description)
  //
  //   // cy.get('[data-cy=opp-create-dialog]')
  //   //   .first().click(-50, -50, {force: true})
  //
  // })
})
