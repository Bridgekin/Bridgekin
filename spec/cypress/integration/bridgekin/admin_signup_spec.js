describe('Admin signup spec', function () {
  let email = 'test@tester.com'
  let password = 'password'
  let domain = 'tester.com'
  let title = 'Testerbridgekin'
  let code = '123456789-eftw'
  let fname = 'tester'
  let lname = 'person'
  let seats = 4
  let monthly_amount = 300
  let yearly_amount = 3000

  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
    cy.appFactories([
      ['create', 'sales_product', 'with_signup_link',
      { code: code, seats, monthly_amount, yearly_amount}]
    ])
    cy.visit(`/sales/admin_signup/signup?code=${code}`)
  })

  it('shows an error message if no/incorrect admin link provided', function () {
    cy.visit(`/sales/admin_signup/signup?code=fakecode`)
    cy.url().should('include', '/sales/admin_signup/signup')
    cy.get('[data-cy=no-link-response]').contains('Signup Link Not Found')
  })

  it('loads admin signup page based on login', function () {
    cy.url().should('include', '/sales/admin_signup/signup')
    cy.get('[data-cy=signup-header]').contains('Create Your Account') 
  })

  it('next button disabled even if all fields filled in, if no checkbox', function () {
    cy.get('[data-cy=fname-input] input')
      .type(fname)
      .should('have.value', fname)
    cy.get('[data-cy=lname-input] input')
      .type(lname)
      .should('have.value', lname)
    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=password-input] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=company-title-input] input')
      .type(title)
      .should('have.value', title)
    cy.get('[data-cy=company-domain-input] input')
      .type(domain)
      .should('have.value', domain)

    cy.get('[data-cy=next-button]')
      .should('be.disabled')
  })

  it('loads next page after all fields filled in', function () {
    cy.get('[data-cy=fname-input] input')
      .type(fname)
      .should('have.value', fname)
    cy.get('[data-cy=lname-input] input')
      .type(lname)
      .should('have.value', lname)
    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=password-input] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=company-title-input] input')
      .type(title)
      .should('have.value', title)
    cy.get('[data-cy=company-domain-input] input')
      .type(domain)
      .should('have.value', domain)

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=next-button]').click()
    cy.url().should('include', '/sales/admin_signup/payment')
  })

  it('payment page has correct values', function () {
    cy.get('[data-cy=fname-input] input')
      .type(fname)
      .should('have.value', fname)
    cy.get('[data-cy=lname-input] input')
      .type(lname)
      .should('have.value', lname)
    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=password-input] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=company-title-input] input')
      .type(title)
      .should('have.value', title)
    cy.get('[data-cy=company-domain-input] input')
      .type(domain)
      .should('have.value', domain)

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=next-button]').click()

    // On payment page
    cy.get('[data-cy=seats-count]')
      .should('contain', seats)
    cy.get('[data-cy=period-amount]')
      .should('contain', monthly_amount)
    cy.get('[data-cy=toggle-period]').click()
    cy.get('[data-cy=period-amount]')
      .should('contain', yearly_amount)
  })

  it("payment page won't submit without card details", function () {
    cy.get('[data-cy=fname-input] input')
      .type(fname)
      .should('have.value', fname)
    cy.get('[data-cy=lname-input] input')
      .type(lname)
      .should('have.value', lname)
    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=password-input] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=company-title-input] input')
      .type(title)
      .should('have.value', title)
    cy.get('[data-cy=company-domain-input] input')
      .type(domain)
      .should('have.value', domain)

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=next-button]').click()

    // On payment page
    cy.get('[data-cy=seats-count]')
      .should('contain', seats)
    cy.get('[data-cy=period-amount]')
      .should('contain', monthly_amount)
    cy.get('[data-cy=toggle-period]').click()
    cy.get('[data-cy=period-amount]')
      .should('contain', yearly_amount)

    cy.get('[data-cy=signup-button]')
      .should('be.disabled')
  })

  it("should sign a user in after all fields checked", function () {
    cy.get('[data-cy=fname-input] input')
      .type(fname)
      .should('have.value', fname)
    cy.get('[data-cy=lname-input] input')
      .type(lname)
      .should('have.value', lname)
    cy.get('[data-cy=email-input] input')
      .type(email)
      .should('have.value', email)
    cy.get('[data-cy=password-input] input')
      .type(password)
      .should('have.value', password)

    cy.get('[data-cy=company-title-input] input')
      .type(title)
      .should('have.value', title)
    cy.get('[data-cy=company-domain-input] input')
      .type(domain)
      .should('have.value', domain)

    cy.get('[data-cy=terms-checkbox] input').check()
    cy.get('[data-cy=next-button]').click()

    // On payment page
    cy.get('[data-cy=seats-count]')
      .should('contain', seats)
    cy.get('[data-cy=period-amount]')
      .should('contain', monthly_amount)
    cy.get('[data-cy=toggle-period]').click()
    cy.get('[data-cy=period-amount]')
      .should('contain', yearly_amount)

    cy.get('iframe').then($iframe => {
      cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body)
          .find('input[name="cardnumber"]')
          .type('4242')
          .type('4242')
          .type('4242')
          .type('4242')

        cy.wrap($body)
          .find('input:eq(2)')
          .type('1222')
        cy.wrap($body)
          .find('input:eq(3)')
          .type('223')
        cy.wrap($body)
          .find('input:eq(4)')
          .type('424242')
      })
    })
    cy.get('[data-cy=signup-button]').click()
    cy.url().should('include', '/sales/connect_social')
  })
})
