describe('Invite User Specs', function () {
  let email = 'test@email.com'
  let password = 'password'
  
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_owned_sales_network', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
    cy.get_managed_network().then(data => data.salesNetwork).as('network')
  })

  // it("load invite page on click", function () {
  //   cy.visit('/sales/dashboard')
  //   cy.get('[data-cy=invite-button]').click()
  //   cy.get('[data-cy=invite-header]')
  //     .should('contain', 'Invite Folks To')
  // })

  // it("should be disabled if all fields on all available invites aren't full", function () {
  //   cy.visit(`/sales/invite_external`)
  //   cy.get('[data-cy=submit-button]')
  //     .should('be.disabled')
  //   cy.get('[data-cy=invite-email-input] input')
  //     .type('test@email.com')
  //     .should('have.value', 'test@email.com')
  //   cy.get('[data-cy=invite-fname-input] input')
  //     .type('test')
  //     .should('have.value', 'test')
  //   cy.get('[data-cy=submit-button]')
  //     .should('be.disabled')
  // })

  // it("should fill fields", function () {
  //   cy.visit(`/sales/invite_external`)
  //   cy.get('[data-cy=submit-button]')
  //     .should('be.disabled')
  //   cy.get('[data-cy=invite-email-input] input')
  //     .type('test@email.com')
  //     .should('have.value', 'test@email.com')
  //   cy.get('[data-cy=invite-fname-input] input')
  //     .type('test')
  //     .should('have.value', 'test')
  //   cy.get('[data-cy=invite-lname-input] input')
  //     .type('user')
  //     .should('have.value', 'user')
  // })

  // it("should submit with full fields", function () {
  //   cy.visit(`/sales/invite_external`)
  //   cy.get('[data-cy=submit-button]')
  //     .should('be.disabled')
  //   cy.get('[data-cy=invite-email-input] input')
  //     .type('test@email.com')
  //     .should('have.value', 'test@email.com')
  //   cy.get('[data-cy=invite-fname-input] input')
  //     .type('test')
  //     .should('have.value', 'test')
  //   cy.get('[data-cy=invite-lname-input] input')
  //     .type('user')
  //     .should('have.value', 'user')
  //   cy.get('[data-cy=invite-member_type]').click()
  //   cy.get('[data-cy=limited-member_type]').click()

  //   cy.get('[data-cy=submit-button]').click()
  //   cy.get('[data-cy=invite-response-header]')
  //     .should('contain', 'Your Invites Have Been Sent')
  // })

  // it("should add an additional invite slot", function () {
  //   cy.visit(`/sales/invite_external`)
  //   cy.get('[data-cy=add-another-user]').click()
  //   cy.get('[data-cy=network-invite-card]')
  //     .should('be.length', 2)
  // })

  it("should add an additional invite slot", function () {
    cy.visit(`/sales/invite_external`)
    cy.get('[data-cy=choose-space-button]').click()
    cy.get('[data-cy=dashboard-option-]').click()
    cy.get('[data-cy=invite-header]')
      .should('contain', 'Your Personal Contacts')
  })
})
