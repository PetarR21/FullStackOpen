describe('template spec', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Aiden Pierce',
      username: 'aiden34',
      password: 'seentoomany',
    }

    const anotherUser = {
      name: 'Mark Hunt',
      username: 'markH',
      password: 'helloworld',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser)

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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'aiden34', password: 'seentoomany' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress title')
      cy.get('#author').type('Cypress author')
      cy.get('#url').type('http://cypress.com')
      cy.get('#create-button').click()

      cy.contains('Cypress title Cypress author')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title 1',
          author: 'Author 1',
          url: 'http://example.com/1',
          likes: 10,
        })
        cy.createBlog({
          title: 'Title 2',
          author: 'Author 2',
          url: 'http://example.com/2',
          likes: 20,
        })
        cy.createBlog({
          title: 'Title 3',
          author: 'Author 3',
          url: 'http://example.com/3',
          likes: 19,
        })
      })

      it('blog can be liked', function () {
        cy.contains('Title 1').parent().find('button').click()
        cy.contains('likes 10')
        cy.contains('likes 10').parent().find('button').click()
        cy.contains('likes 11')
      })

      it('user who created a blog can delete it', function () {
        cy.contains('Title 1').parent().find('button').click()

        cy.contains('hide').parent().parent().contains('remove').click()

        cy.get('html').should('not.contain', 'Title 1 Author 1')
      })

      it('only the creator can see the delete button of a blog', function () {
        cy.logout()
        cy.login({ username: 'markH', password: 'helloworld' })
        cy.contains('Mark Hunt logged in')

        cy.contains('Title 1').parent().find('button').click()

        cy.contains('hide').parent().parent().should('not.contain', 'remove')
      })

      it('the blogs are ordered by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Title 2')
        cy.get('.blog').eq(1).should('contain', 'Title 3')
        cy.get('.blog').eq(2).should('contain', 'Title 1')

        cy.contains('Title 3').parent().find('button').click()

        cy.contains('Title 3')
          .parent()
          .parent()
          .contains('likes 19')
          .parent()
          .find('button')
          .click()

        cy.contains('Title 3')
          .parent()
          .parent()
          .contains('likes 20')
          .parent()
          .find('button')
          .click()

        cy.get('.blog').eq(0).should('contain', 'Title 3')
      })
    })
  })
})
