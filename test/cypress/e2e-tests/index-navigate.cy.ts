describe('Navigation to index', () => {
  it('should redirect an already-authenticated user to the landing page', () => {
    cy.intercept('HEAD', '/api/session', {
      statusCode: 200,
    })

    cy.visit('/')
    cy.wait(500)

    cy.url().should('contain', 'landing')
  })

  it('should redirect an unauthenticated user to the login page', () => {
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })

    cy.visit('/')
    cy.wait(500)

    cy.url().should('contain', 'login')
  })
})

export {}
