describe('template spec', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Aiden Pierce',
      username: 'aiden34',
      password: 'seentoomany',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aiden34')
      cy.get('#password').type('seentoomany')
      cy.get('#login-button').click()

      cy.contains('Aiden Pierce logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wronguserpassword')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })
})
