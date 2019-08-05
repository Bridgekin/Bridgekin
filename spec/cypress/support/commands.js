// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: 'POST',
    url: "http://localhost:3000/api/login",
    body: {
      user: {
        email: email,
        password: password
      }
    }
  })
    .then((resp) => {
      let token = resp.body.token
      window.localStorage.setItem('bridgekinToken', resp.body.token);
    })
})

Cypress.Commands.add("get_sample_contacts", () => {
  cy.request({
    method: 'GET',
    url: "http://localhost:3000/api/cypress/first_five_contacts",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
    .then(data => data.body)
})

Cypress.Commands.add("get_managed_network", () => {
  cy.request({
    method: 'GET',
    url: "http://localhost:3000/api/cypress/first_managed_network",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
    .then(data => data.body)
})

Cypress.Commands.add("get_received_request", () => {
  cy.request({
    method: 'GET',
    url: "http://localhost:3000/api/cypress/received_intro_request",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
    .then(data => data.body)
})

Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem('bridgekinToken')
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
