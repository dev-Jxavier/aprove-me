describe('Get Payable', () => {
  const payableMock = {
    id: '123',
    value: 555,
    emissionDate: "2024-11-29T13:12:22.617Z",
    assignorId: 'assignorId123'
  };

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
    cy.visit(`http://localhost:3333/dashboard/payable/${payableMock.id}`);
  });
  
  it('deve exibir o estado de carregamento enquanto busca os dados', () => {

    // Interceptar a chamada e atrasar a resposta para testar o estado de carregamento
    cy.intercept('GET', `http://localhost:3000/integrations/payable/${payableMock.id}`, {
      delay: 1000,
      statusCode: 200,
      body: payableMock
    }).as('getPayable');

    cy.contains('Carregando...').should('be.visible');
    cy.wait('@getPayable');
  });

  it('deve exibir os dados do pagável corretamente', () => {
    // Mock para retornar um payable válido
    cy.intercept('GET', `http://localhost:3000/integrations/payable/${payableMock.id}`, { statusCode: 200, body: payableMock }).as('getPayable');

    cy.wait('@getPayable');

    // Verificar se os dados estão visíveis
    cy.contains('Valor:').should('contain', payableMock.value);
    cy.contains('Data:').should('contain', new Date(payableMock.emissionDate).toLocaleDateString());
    cy.contains('Id do cedente:').should('contain', payableMock.assignorId);
  });

  it('deve exibir uma mensagem caso nenhum pagável seja encontrado', () => {
    // Mock para simular um payable não encontrado
    cy.intercept('GET', 'http://localhost:3000/integrations/payable/123', { statusCode: 200, body: null }).as('getPayable');

    cy.wait('@getPayable');

    // Verificar a mensagem de "Nenhum pagável encontrado!"
    cy.contains('Nenhum pagável encontrado!').should('be.visible');
  });
});
