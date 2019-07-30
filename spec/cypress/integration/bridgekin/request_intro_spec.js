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
  })
})
