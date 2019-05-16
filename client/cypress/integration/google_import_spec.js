import dotenv from 'dotenv'

describe('Test import contact flow', () => {
  beforeEach(function(){
    dotenv.config()
    cy.fixture('user.json').as('user').then((user) => {
      cy.login(user.email)
      cy.visit('/')
    })
  })

  it('loads contacts', function() {
    cy.get('[data-cy=nav-my-trusted-network-button]').first().click()
    cy.get('[data-cy=import-google-button]').first().click()
    let val = process.env.GOOGLE_USER
    debugger
  })

})
