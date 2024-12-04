describe('List Payable', () => {
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

    //Visitar página para mostrar pagável
    cy.visit(`http://localhost:3333/dashboard/payable/list`);
  });

  it('deve carregar e exibir a lista de pagáveis', () => {

    // Mock para a API de listagem de pagáveis
    cy.intercept('GET', 'http://localhost:3000/integrations/payable', {
      statusCode: 200,
      body: [
        {
          id: '1',
          value: 1000,
          emissionDate: '2024-11-30T08:00:00.000Z',
        },
        {
          id: '2',
          value: 2000,
          emissionDate: '2024-11-29T08:00:00.000Z',
        },
      ],
    }).as('getPayables');


    // Aguarda a resposta da API de listagem
    cy.wait('@getPayables');

    // Verifica se o título está correto
    cy.contains('Lista de pagáveis:').should('be.visible');

    // Verifica a tabela de dados
    cy.get('table tbody tr').should('have.length', 2); // Deve conter dois itens

    // Verifica o conteúdo da tabela
    cy.get('table tbody tr').eq(0).within(() => {
      cy.contains('1').should('be.visible');
      cy.contains('R$ 100.00').should('be.visible');
      cy.contains('11/30/2024, 5:00:00 AM').should('be.visible'); // UTC-3
    });

    cy.get('table tbody tr').eq(1).within(() => {
      cy.contains('2').should('be.visible');
      cy.contains('R$ 200.00').should('be.visible');
      cy.contains('11/29/2024, 5:00:00 AM').should('be.visible'); // UTC-3
    });
  });

  it('deve excluir um pagável e atualizar a lista', () => {
    // Mock para a API de listagem de pagáveis
    cy.intercept('GET', 'http://localhost:3000/integrations/payable', {
      statusCode: 200,
      body: [
        {
          id: '1',
          value: 1000,
          emissionDate: '2024-11-30T08:00:00.000Z',
        },
        {
          id: '2',
          value: 2000,
          emissionDate: '2024-11-29T08:00:00.000Z',
        },
      ],
    }).as('getPayables');

    // Mock para a API de exclusão de pagáveis
    cy.intercept('DELETE', 'http://localhost:3000/integrations/payable/*', {
      statusCode: 200,
    }).as('deletePayable');

    // Mock para nova listagem sem o item excluído
    cy.intercept('GET', 'http://localhost:3000/integrations/payable', {
      statusCode: 200,
      body: [
        {
          id: '2',
          value: 2000,
          emissionDate: '2024-11-29T08:00:00.000Z',
        },
      ],
    }).as('getPayablesUpdated');

    // Aguarda a resposta da API de listagem
    cy.wait('@getPayables');

    // Clique no botão de exclusão do primeiro item (botão com ícone de lixeira)
    cy.get('table tbody tr').eq(0).find('button').first().click();

    // Aguarda a resposta da API de exclusão
    cy.wait('@deletePayable').its('request.url').should('include', '/payable/1');

    // Recarregar a lista após exclusão
    cy.wait('@getPayablesUpdated');

    // Verificar se o item foi removido
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr').eq(0).within(() => {
      cy.contains('2').should('be.visible');
    });
  });

  it('deve redirecionar para a página de edição ao clicar no ícone de edição', () => {
    // Mock para a API de listagem de pagáveis
    cy.intercept('GET', 'http://localhost:3000/integrations/payable', {
      statusCode: 200,
      body: [
        {
          id: '1',
          value: 1000,
          emissionDate: '2024-11-30T08:00:00.000Z',
        },
        {
          id: '2',
          value: 2000,
          emissionDate: '2024-11-29T08:00:00.000Z',
        },
      ],
    }).as('getPayables');

    // Aguarda a resposta da API de listagem
    cy.wait('@getPayables');

    // Clicar no ícone de edição do primeiro item
    cy.get('table tbody tr').eq(0).find('a').first().click();

    // Verificar redirecionamento para a página de edição
    cy.url().should('include', '/dashboard/payable/edit/1');
  });

  it('deve redirecionar para a página de detalhes ao clicar no ícone de informações', () => {
    // Mock para a API de listagem de pagáveis
    cy.intercept('GET', 'http://localhost:3000/integrations/payable', {
      statusCode: 200,
      body: [
        {
          id: '1',
          value: 1000,
          emissionDate: '2024-11-30T08:00:00.000Z',
        },
        {
          id: '2',
          value: 2000,
          emissionDate: '2024-11-29T08:00:00.000Z',
        },
      ],
    }).as('getPayables');

    // Aguarda a resposta da API de listagem
    cy.wait('@getPayables');

    // Clicar no ícone de edição do primeiro item
    cy.get('table tbody tr').eq(0).find('a').eq(1).click();

    // Verificar redirecionamento para a página de detalhes
    cy.url().should('include', '/dashboard/payable/1');
  });
});
