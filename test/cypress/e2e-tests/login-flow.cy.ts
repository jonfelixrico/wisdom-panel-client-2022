describe('Login flow', () => {
  it('should be able to handle a successful login', () => {
    // 401 will make the user stay on /login because they are unauthenticated
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })
    cy.visit('/login')

    cy.intercept('/api/auth/oauth/discord', {
      fixture: 'html/login/oauth.html',
    }).as('redirectToOAuth')

    // on click of the discord login button, they will be redirected to the OAuth page
    cy.dataCy('discord-login-btn').click()
    cy.wait('@redirectToOAuth')

    // this is to trick the callback page that the user really was successful
    cy.intercept('HEAD', '/api/session', {
      statusCode: 200,
    })

    /*
     * by clicking this, user finishes OAuth process
     *
     * the user will actually be redirected to the callback page
     */
    cy.dataCy('redirect-href').click()

    // callback page will redirect user to the landing page
    cy.wait(200)
    cy.url().should('contain', 'landing')
  })

  it('should be able to handle oauth error', () => {
    // 401 will make the user stay on /login because they are unauthenticated
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })
    cy.visit('/login')

    cy.intercept('/api/auth/oauth/discord', {
      fixture: 'html/login/oauth.html',
    }).as('redirectToOAuth')

    // on click of the discord login button, they will be redirected to the OAuth page
    cy.dataCy('discord-login-btn').click()
    cy.wait('@redirectToOAuth')

    // this is to trick the callback page that the login failed somehow
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })

    /*
     * by clicking this, user finishes OAuth process
     *
     * the user will actually be redirected to the callback page
     */
    cy.dataCy('redirect-href').click()

    // an error dialog must be displayed to the user to inform them of the failed login
    cy.withinDialog({
      persistent: true,
      fn() {
        // intended to be empty, required
      },
    })

    // failed logins from the callback will redirect the user back to the login
    cy.wait(200)
    cy.url().should('contain', 'login')
  })

  it('should be able to handle a successful login with redirect', () => {
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    }).as('getSession401')

    cy.visit('/preview/server/server-1/quote/quote-1')
    // user should be redirected since they are not yet authenticated
    cy.wait('@getSession401')
    cy.url().should('contain', 'login')

    /*
     * need to use regexp here because we want to do a "contains" check
     * using the regular string format will cause intercept to listen only for
     * the exact path.
     */
    cy.intercept(/\/api\/auth\/oauth\/discord/, {
      fixture: 'html/login/oauth-with-redirect.html',
    }).as('redirectToOAuth')

    // on click of the discord login button, they will be redirected to the OAuth page
    cy.dataCy('discord-login-btn').click()
    cy.wait('@redirectToOAuth')

    // this is to trick the callback page that the user really was successful
    cy.intercept('HEAD', '/api/session', {
      statusCode: 200,
    }).as('getSession200')

    /*
     * by clicking this, user finishes OAuth process
     *
     * the user will actually be redirected to the callback page
     */
    cy.dataCy('redirect-href').click()

    cy.intercept('HEAD', '/api/server/server-1/quote/quote-1', {
      statusCode: 200,
    })

    cy.wait('@getSession200')

    // callback page will redirect user to the landing page
    cy.wait(200)
    cy.url().should('contain', 'preview/server/server-1/quote/quote-1')
  })
})

export {}
