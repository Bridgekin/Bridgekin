describe('Bridgekin login specs', function () {
  let email = 'test@email.com'
  let password = 'password'
  
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_team_loaded_network', { email: email, password: password, password_confirmation: password }]
    ])
    cy.login(email, password)
    cy.visit('/sales/dashboard')
  })

  it("should open request intro", function () {
    cy.get('[data-cy=request-intro-button]').first().click()
    cy.get('[data-cy=request-intro-header]')
      .should('contain', 'Intro Details')
  })

  it("should fill all fields", function () {
    cy.get('[data-cy=request-intro-button]').first().click()
    cy.get('[data-cy=select-target-button]').click()
    cy.get('[data-cy=select-target-option]').first().click()
    
    cy.get('[data-cy=referral-bonus-input] input')
      .clear()
      .type('45')
      .should('have.value', '45')
    cy.get('[data-cy=toggle-referral-type]').click()
    cy.get('[data-cy=message-input] > .MuiInputBase-root > .MuiInputBase-input')
      .type('lorem upsum blah blah')
      .should('have.value', 'lorem upsum blah blah')
    cy.get('[data-cy=explaination-input] > .MuiInputBase-root > .MuiInputBase-input')
      .type('lorem upsum blah blah yadda yadda')
      .should('have.value', 'lorem upsum blah blah yadda yadda')
  })

  it("should send intro request without fields", function () {
    cy.get('[data-cy=request-intro-button]').first().click()
    cy.get('[data-cy=select-target-button]').click()
    cy.get('[data-cy=select-target-option]').first().click()
    
    cy.get('[data-cy=submit-request]').click()
    cy.get('[data-cy=success-response-header]')
      .should('contain', 'Introduction Request Sent')
  })

  it("should send intro request with fields", function () {
    cy.get('[data-cy=request-intro-button]').first().click()
    cy.get('[data-cy=select-target-button]').click()
    cy.get('[data-cy=select-target-option]').first().click()

    cy.get('[data-cy=referral-bonus-input] input')
      .clear()
      .type('45')
      .should('have.value', '45')
    cy.get('[data-cy=toggle-referral-type]').click()
    cy.get('[data-cy=message-input] > .MuiInputBase-root > .MuiInputBase-input')
      .type('lorem upsum blah blah')
      .should('have.value', 'lorem upsum blah blah')
    cy.get('[data-cy=explaination-input] > .MuiInputBase-root > .MuiInputBase-input')
      .type('lorem upsum blah blah yadda yadda')
      .should('have.value', 'lorem upsum blah blah yadda yadda')
    cy.get('[data-cy=submit-request]').click()
    cy.get('[data-cy=success-response-header]')
      .should('contain', 'Introduction Request Sent')
  })

  it("create new saved template", function () {
    cy.get('[data-cy=request-intro-button]').first().click()
    cy.get('[data-cy=select-target-button]').click()
    cy.get('[data-cy=select-target-option]').first().click()
    cy.get('[data-cy=custom-page-button]').click()

    cy.get('[data-cy=add-template-button]').click()
    cy.get('[data-cy=template-name-input] input')
      .type('test_template')
      .should('have.value', 'test_template')
    cy.get('[data-cy=template-subject-input] input')
      .type('lorem upsum blah blah ')
      .should('have.value', 'lorem upsum blah blah ')

    cy.get('[data-cy=template-body-input] > .MuiInputBase-root > .MuiInputBase-input')
      .type('lorem upsum blah blah - if ya dont know, know ya know ')
      .should('have.value', 'lorem upsum blah blah - if ya dont know, know ya know ')
    cy.get('[data-cy=save-template]').click()

    cy.get('[data-cy=choose-template-button]').click()
    cy.get('[data-cy=template-option]')
      .should('contain', 'test_template')
  })

  it("use saved template to send", function () {
    cy.get('[data-cy=request-intro-button]').first().click()
    cy.get('[data-cy=select-target-button]').click()
    cy.get('[data-cy=select-target-option]').first().click()
    cy.get('[data-cy=custom-page-button]').click()

    cy.get('[data-cy=add-template-button]').click()
    cy.get('[data-cy=template-name-input] input')
      .type('test_template')
      .should('have.value', 'test_template')
    cy.get('[data-cy=template-subject-input] input')
      .type('lorem upsum blah blah ')
      .should('have.value', 'lorem upsum blah blah ')

    cy.get('[data-cy=template-body-input] > .MuiInputBase-root > .MuiInputBase-input')
      .type('lorem upsum blah blah - if ya dont know, know ya know ')
      .should('have.value', 'lorem upsum blah blah - if ya dont know, know ya know ')
    cy.get('[data-cy=save-template]').click()

    cy.get('[data-cy=choose-template-button]').click()
    cy.get('[data-cy=template-option]')
      .last().click()
    cy.get('[data-cy=submit-request]').click()
    cy.get('[data-cy=success-response-header]')
      .should('contain', 'Introduction Request Sent')
  })
})
