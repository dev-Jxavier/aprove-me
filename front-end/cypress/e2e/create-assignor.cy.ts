describe('Create Assignor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3333');

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

    // Verificar se o token foi salvo no localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('@token-bankme')).to.eq('mocked-access-token');
    });

    //Visitar página para criar cedente
    cy.visit('http://localhost:3333/dashboard/assignor/create');
  });

  it('deve criar um assignor com dados válidos e redirecionar para a página correta', () => {

    const mockData = {
      document: "458.963.357-52",
      email: "jones@gmail.com",
      phone: "55999999999",
      name: "jones"
    }
    const id = '12345'

    // Mock da resposta da API post assignor
    cy.intercept('POST', 'http://localhost:3000/integrations/assignor', {
      statusCode: 201,
      body: { ...mockData, id },
    }).as('createAssignor');

    //Mock da resposta da API get assignor
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor/12345', {
      statusCode: 200,
      body: { ...mockData, id },
    }).as('getAssignorId');

    // Preencher o formulário
    cy.get('input[placeholder="00.000.000-00"]').type(mockData.document);
    cy.get('input[placeholder="example@example.com"]').type(mockData.email);
    cy.get('input[placeholder="55996359999"]').type(mockData.phone);
    cy.get('input[placeholder="Jones"]').type(mockData.name);

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // // Verificar se o request foi feito corretamente
    cy.wait('@createAssignor').its('request.method').should('eq', 'POST');

    // Verificar redirecionamento após sucesso
    cy.url().should('include', `/dashboard/assignor/${id}`)

    cy.end()
  });

  it('deve exibir mensagens de erro para campos inválidos ou ausentes', () => {
    // Deixar os campos vazios e tentar submeter
    cy.get('button[type="submit"]').click();
  
    // Verificar se as mensagens de erro estão visíveis na tela
    cy.contains('O documento é obrigatório').should('be.visible');
    cy.contains('O email é obrigatório').should('be.visible');
    cy.contains('O telefone é obrigatório').should('be.visible');
    cy.contains('O nome é obrigatório').should('be.visible');
  });
  

  it('deve exibir erro interno ao receber uma resposta de erro do servidor', () => {

    const mockData = {
      document: "458.963.357-52",
      email: "jones@gmail.com",
      phone: "55999999999",
      name: "jones"
    }

    // Mock da resposta de erro da API
    cy.intercept('POST', 'http://localhost:3000/integrations/assignor', {
      statusCode: 500,
      body: {
        message: 'Erro interno no servidor',
      },
    }).as('createAssignorError');

    // Preencher o formulário
    cy.get('input[placeholder="00.000.000-00"]').type(mockData.document);
    cy.get('input[placeholder="example@example.com"]').type(mockData.email);
    cy.get('input[placeholder="55996359999"]').type(mockData.phone);
    cy.get('input[placeholder="Jones"]').type(mockData.name);

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se a mensagem de erro interno é exibida
    cy.wait('@createAssignorError');
    cy.contains('Erro interno! Contate o suporte').should('be.visible');
  });
});
