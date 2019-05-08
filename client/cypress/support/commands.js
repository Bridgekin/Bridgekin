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

Cypress.Commands.add("login" , (email) => {
  cy.request({
    method: 'POST',
    url: "http://localhost:5000/api/login",
    body: {
      user: {
        email: email,
        password: 'password'
      }
    }
  })
  .then((resp) => {
    window.localStorage.setItem('bridgekinToken', resp.body.token);
  })
})

Cypress.Commands.add("logout" , () => {
  window.localStorage.removeItem('bridgekinToken');
})

Cypress.Commands.add("delete_waitlist_user" , (email) => {
  cy.request({
    method: 'DELETE',
    url: "http://localhost:5000/api/waitlist_user",
    body: {
      email: email
    }
  })
})

Cypress.Commands.add("delete_user" , (email) => {
  cy.request({
    method: 'DELETE',
    url: "http://localhost:5000/api/destroy_user_by_email",
    body: {
      email: email
    }
  })
})

Cypress.Commands.add("destroy_all_user_opps" , () => {
  cy.request({
    method: 'DELETE',
    url: "http://localhost:5000/api/destroy_all_user_opps",
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
})

Cypress.Commands.add("destroy_user_connected_opps" , () => {
  cy.request({
    method: 'DELETE',
    url: "http://localhost:5000/api/destroy_user_connected_opps",
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
})

Cypress.Commands.add("get_referral_link" , () => {
  cy.request({
    method: 'POST',
    url: "http://localhost:5000/api/referral_links",
    body: {
      referral:{
        network_id: 1,
        is_friendable: false,
        usage_type: 'Single'
      }
    },
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
  .then((resp) => {
    return resp.body
  })
})
