describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3333'); 
  });

  it('deve realizar login com credenciais válidas e redirecionar para o dashboard', () => {
    // Mock da resposta da API
    cy.intercept('POST', 'http://localhost:3000/integrations/auth', {
      statusCode: 200,
      body: {
        access_token: 'mocked-access-token',
      },
    }).as('loginRequest');

    // Preencher o formulário de login
    cy.get('input[placeholder="usuário"]').type('aprovame');
    cy.get('input[placeholder="senha"]').type('aprovame');
    cy.get('button[type="submit"]').click();

    // Verificar se o request foi feito corretamente
    cy.wait('@loginRequest').its('request.body').should((body) => {
      expect(body).to.deep.equal({
        login: 'aprovame',
        password: 'aprovame',
      });
    });

    // Verificar se o token foi salvo no localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('@token-bankme')).to.eq('mocked-access-token');
    });

    // Verificar redirecionamento para o dashboard
    cy.url().should('include', '/dashboard');
  });

  it('deve exibir mensagem de erro para credenciais inválidas', () => {
    // Mock da resposta da API para erro
    cy.intercept('POST', 'http://localhost:3000/integrations/auth', {
      statusCode: 401,
      body: { message: "Login não autorizado!", error: "Unauthorized", statusCode: 401 },
    }).as('loginRequest');

    // Preencher o formulário com credenciais inválidas
    cy.get('input[placeholder="usuário"]').type('invalid_user');
    cy.get('input[placeholder="senha"]').type('invalid_pass');
    cy.get('button[type="submit"]').click();

    // Verificar se a mensagem de erro é exibida
    cy.wait('@loginRequest');
    cy.get('p.text-red-600').should('contain', 'Login não autorizado!');
  });
});
