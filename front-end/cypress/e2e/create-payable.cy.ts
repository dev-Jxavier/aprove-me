describe('Create Payable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3333');

    // Mock da resposta da API de login
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

    // Visitar a página de criar pagável
    cy.visit('http://localhost:3333/dashboard/payable/create');
  });

  it('deve criar um payable com dados válidos e redirecionar para a página correta', () => {
    const mockData = {
      value: 666,
      emissionDate: "2024-11-30T05:28:49.777Z",
      assignorId: 'assignorId123',
    };
    const id = '12345';

    // Mock da resposta da API POST para criar pagável
    cy.intercept('POST', 'http://localhost:3000/integrations/payable', {
      statusCode: 201,
      body: { ...mockData, id },
    }).as('createPayable');

    // Mock da resposta da API GET para resgatar o pagável
    cy.intercept('GET', `http://localhost:3000/integrations/payable/${id}`, {
      statusCode: 200,
      body: { ...mockData, id },
    }).as('getPayable');

    // Mock da resposta da API GET para resgatar os cedentes para o select
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor', {
      statusCode: 200,
      body: [{
        id: '12345',
        document: '123.456.789-01',
        email: 'jones@gmail.com',
        phone: '5599999999',
        name: 'Cedente 1'
      }],
    }).as('getAllAssignors');

    // Preencher o formulário
    cy.get('input[placeholder="00.00"]').type(mockData.value.toString());
    cy.get('input[type="datetime-local"]').type(mockData.emissionDate.substring(0, 16)); // Formatar data para datetime-local

    // Selecionar o cedente
    cy.get('button').contains('Selecione um cedente').click(); // Abrir o dropdown
    cy.contains('Cedente 1 - 123.456.789-01').click(); // Selecionar a opção

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se a requisição POST foi feita corretamente
    cy.wait('@createPayable').its('request.method').should('eq', 'POST');

    // Verificar redirecionamento após sucesso
    cy.url().should('include', `/dashboard/payable/${id}`);
  });

  it('deve exibir mensagens de erro para campos inválidos ou ausentes', () => {
    // Deixar os campos vazios e tentar submeter
    cy.get('button[type="submit"]').click();

    // Verificar mensagens de erro para campos obrigatórios
    cy.contains('O valor é obrigatório').should('be.visible');
    cy.contains('A data é obrigatório').should('be.visible');
    cy.contains('O cedente é obrigatório').should('be.visible');
  });

  it('deve exibir erro interno ao receber uma resposta de erro do servidor', () => {
    const mockData = {
      value: 666,
      emissionDate: "2024-11-30T05:28:49.777Z",
      assignorId: 'assignorId123',
    };

    // Mock da resposta de erro da API
    cy.intercept('POST', 'http://localhost:3000/integrations/payable', {
      statusCode: 500,
      body: {
        message: 'Erro interno no servidor',
      },
    }).as('createPayableError');

    // Mock da resposta da API GET para resgatar os cedentes para o select
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor', {
      statusCode: 200,
      body: [{
        id: '12345',
        document: '123.456.789-01',
        email: 'jones@gmail.com',
        phone: '5599999999',
        name: 'Cedente 1'
      }],
    }).as('getAllAssignors');

    // Preencher o formulário
    cy.get('input[placeholder="00.00"]').type(mockData.value.toString());
    cy.get('input[type="datetime-local"]').type(mockData.emissionDate.substring(0, 16)); // Formatar data para datetime-local

     // Selecionar o cedente
     cy.get('button').contains('Selecione um cedente').click(); // Abrir o dropdown
     cy.contains('Cedente 1 - 123.456.789-01').click(); // Selecionar a opção

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se a mensagem de erro interno é exibida
    cy.wait('@createPayableError');
    cy.contains('Erro interno! Contate o suporte').should('be.visible');
  });
});
