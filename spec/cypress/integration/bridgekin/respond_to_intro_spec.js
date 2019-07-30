describe('Respond to intro', function () {
  let email = 'test@email.com'
  let password = 'password'
  let referral_bonus = 25
  let referral_unit = "%"
  let message = "Example from cypress"
  let explaination = "Because!"
  let intro_subject = "Something"
  let intro_body = "Something else"
  // let explaination = "Because!"

  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.appFactories([
      ['create', 'user', 'uploaded', 'with_team_loaded_network_with_intro', { email: email,
        password: password, password_confirmation: password,
        referral_bonus: referral_bonus, message: message, explaination: explaination, intro_subject: intro_subject, intro_body: intro_body}]
    ])
    cy.login(email, password)
    cy.get_received_request().then(data => data.salesIntro).as('intro')
  })

  it("loads respond to intro request ", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=request-intro-header]')
      .should('contain', "Make warm introductions and help you and your company grow")
  })

  it("have inputted fields in the correct places", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=intro-referral-bonus]')
      .should('contain', referral_bonus )
    cy.get('[data-cy=intro-explaination]')
      .should('contain', explaination)
  })

  it("opens intro page", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=intro-button]').click()
    cy.get('[data-cy=intro-header]')
      .should('contain', `Message to Candidate`)
  })

  it("Ensure intro response is the same as what was inputted", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=intro-button]').click()
    cy.get('[data-cy=intro-subject] input')
      .should('have.value', intro_subject)
    cy.get('[data-cy=intro-body]')
      .should('contain', intro_body)
  })

  it("responds with don't know", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=dont-know-button]').click()
    cy.get('[data-cy=dont-know-response]')
      .should('contain', `No Problem!`)
  })

  it("opens decline page and send is disabled", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=decline-button]').click()
    cy.get('[data-cy=decline-response]')
      .should('contain', 'isn’t a good fit')
    cy.get('[data-cy=respond-intro-submit]')
      .should('be.disabled')
  })

  it("sends declined response with fields", function () {
    cy.visit(`/sales/respond_to_intro/${this.intro.id}`)
    cy.get('[data-cy=decline-button]').click()

    cy.get('[data-cy=reason2-checkbox]').click()
    cy.get('[data-cy=details-input] textarea')
      .type("example response")
      .should('have.value', "example response")
    cy.get('[data-cy=respond-intro-submit]').click()
    cy.get('[data-cy=response-header]')
      .should('contain', 'Thanks for responding')
  })
})
