describe('Get Assignor', () => {
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
    cy.visit('http://localhost:3333/dashboard/assignor/123');
  });


  const assignorMock = {
    id: '123',
    name: 'Jones',
    email: 'jones@gmail.com',
    document: '458.963.357-52',
    phone: '55999999999',
  };

  it('deve exibir o estado de carregamento enquanto busca os dados', () => {

    // Interceptar a chamada e atrasar a resposta para testar o estado de carregamento
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor/123', {
      delay: 1000,
      statusCode: 200,
      body: assignorMock
    }).as('getAssignor');

    cy.contains('Carregando...').should('be.visible');
    cy.wait('@getAssignor');
  });

  it('deve exibir os dados do cedente corretamente', () => {
    // Mock para retornar um assignor válido
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor/123', { statusCode: 200, body: assignorMock }).as('getAssignor');

    cy.wait('@getAssignor');

    // Verificar se os dados estão visíveis
    cy.contains('Nome:').should('contain', assignorMock.name);
    cy.contains('Email:').should('contain', assignorMock.email);
    cy.contains('Documento:').should('contain', assignorMock.document);
    cy.contains('Telefone:').should('contain', assignorMock.phone);
  });

  it('deve exibir uma mensagem caso nenhum cedente seja encontrado', () => {
    // Mock para simular um assignor não encontrado
    cy.intercept('GET', 'http://localhost:3000/integrations/assignor/123', { statusCode: 200, body: null }).as('getAssignor');

    cy.wait('@getAssignor');

    // Verificar a mensagem de "Nenhum cedente encontrado!"
    cy.contains('Nenhum cedente encontrado!').should('be.visible');
  });
});
