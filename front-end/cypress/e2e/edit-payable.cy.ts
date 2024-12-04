describe('Edit payable', () => {
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

    //Visitar página para mostrar cedente
    cy.visit('http://localhost:3333/dashboard/payable/edit/123');
  });

  // beforeEach(() => {
  //   // Mock para obter os dados do pagável pelo ID
  //   cy.intercept('GET', 'http://localhost:3000/integrations/payable/*', {
  //     statusCode: 200,
  //     body: {
  //       id: '12345',
  //       value: 500.0,
  //       emissionDate: '2024-11-30T08:00:00.000Z',
  //       assignorId: 'assignor1',
  //     },
  //   }).as('getPayable');

  //   // Mock da API de assignors
  //   cy.intercept('GET', 'http://localhost:3000/integrations/assignors', {
  //     statusCode: 200,
  //     body: [
  //       { id: 'assignor1', name: 'Cedente 1', document: '123.456.789-01' },
  //       { id: 'assignor2', name: 'Cedente 2', document: '987.654.321-00' },
  //     ],
  //   }).as('getAssignors');

  //   // Mock da API de edição do pagável
  //   cy.intercept('PATCH', 'http://localhost:3000/integrations/payable/*', {
  //     statusCode: 200,
  //   }).as('editPayable');

  //   // Visitar a página de edição
  //   cy.visit('http://localhost:3333/dashboard/payable/edit/12345');
  //   cy.wait('@getPayable');
  // });

  it('deve carregar os dados do pagável corretamente', () => {
    // Mock para obter os dados do pagável pelo ID
    cy.intercept('GET', 'http://localhost:3000/integrations/payable/123', {
      statusCode: 200,
      body: {
        id: '123',
        value: 500.0,
        emissionDate: '2024-11-30T08:00:00.000Z',
        assignorId: 'assignor123',
      },
    }).as('getPayable');

    // Mock da resposta da API GET para resgatar os cedentes para o select
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor', {
      statusCode: 200,
      body: [{
        id: 'assignor123',
        document: '123.456.789-01',
        email: 'jones@gmail.com',
        phone: '5599999999',
        name: 'Cedente 1'
      }],
    }).as('getAllAssignors');

    // Verificar se os campos foram preenchidos com os dados retornados
    cy.get('input[type="number"]').should('have.value', '500'); // Valor
    cy.get('input[type="datetime-local"]').should('have.value', '2024-11-30T05:00'); // Data ajustada para UTC-3
    
    cy.contains('Cedente 1 - 123.456.789-01').should('be.visible'); // Cedente selecionado
  });

  it('deve editar um pagável com sucesso', () => {
    // Mock da resposta da API GET para resgatar os cedentes para o select
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor', {
      statusCode: 200,
      body: [{
        id: 'assignor123',
        document: '123.456.789-01',
        email: 'jones@gmail.com',
        phone: '5599999999',
        name: 'Cedente 1'
      },
      {
        id: 'assignor1234',
        document: '963.852.789-01',
        email: 'jones2@gmail.com',
        phone: '5599999988',
        name: 'Cedente 2'
      }],
    }).as('getAllAssignors');

    // Mock da API GET de pagáveis
    cy.intercept('GET', 'http://localhost:3000/integrations/payable', {
      statusCode: 200,
      body: [{
        id: "c29f55aa-04d8-4815-9165-99ca5c7f5709",
        value: 12345,
        emissionDate: "2024-11-29T13:12:22.617Z",
        assignorId: "b6ca67d8-c775-41e2-92ba-c0ae896fa599"
      }]
    }).as('getAllPayables');

    // Mock da API de edição do pagável
    cy.intercept('PATCH', 'http://localhost:3000/integrations/payable/*', {
      statusCode: 200,
    }).as('editPayable');

    // Alterar os campos
    cy.get('input[type="number"]').clear().type('600'); // Alterar o valor
    cy.get('input[type="datetime-local"]').clear().type('2024-12-01T10:00'); // Alterar a data

    // Selecionar outro cedente
    cy.get('button').contains('Selecione um cedente').click();
    cy.contains('Cedente 2 - 963.852.789-01').click();

    // Submeter o formulário
    cy.get('button').contains('Editar').click();

    // Verificar se a API de edição foi chamada corretamente
    cy.wait('@editPayable').its('request.method').should('eq', 'PATCH');

    // Verificar redirecionamento para a página de listagem
    cy.url().should('include', '/dashboard/payable/list');
  });

  it('deve exibir mensagens de erro para campos obrigatórios', () => {
    // Limpar os campos
    cy.get('input[type="number"]').clear();
    cy.get('input[type="datetime-local"]').clear();

    // Tentar submeter o formulário
    cy.get('button').contains('Editar').click();

    // Verificar mensagens de erro
    cy.contains('O valor é obrigatório').should('be.visible');
    cy.contains('A data é obrigatório').should('be.visible');
    cy.contains('O cedente é obrigatório').should('be.visible');
  });

  it('deve exibir erro interno ao falhar ao salvar o pagável', () => {
    // Mock de erro para a API de edição
    cy.intercept('PATCH', 'http://localhost:3000/integrations/payable/*', {
      statusCode: 500,
      body: { message: 'Erro interno no servidor' },
    }).as('editPayableError');

    // Mock da resposta da API GET para resgatar os cedentes para o select
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor', {
      statusCode: 200,
      body: [{
        id: 'assignor1234',
        document: '963.852.789-01',
        email: 'jones2@gmail.com',
        phone: '5599999988',
        name: 'Cedente 2'
      }],
    }).as('getAllAssignors');

    // Alterar os campos
    cy.get('input[type="number"]').clear().type('600');
    cy.get('input[type="datetime-local"]').clear().type('2024-12-01T10:00');
    cy.get('button').contains('Selecione um cedente').click();
    cy.contains('Cedente 2 - 963.852.789-01').click();

    // Submeter o formulário
    cy.get('button').contains('Editar').click();

    // Verificar mensagem de erro interno
    cy.wait('@editPayableError');
    cy.contains('Erro interno! Contate o suporte').should('be.visible');
  });
});
