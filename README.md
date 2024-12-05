# Guia de Configuração e Execução do Projeto

## Introdução
Este repositório contém duas aplicações:
- **Back-end**: Desenvolvido em NestJS, com autenticação JWT, testes unitários com Jest, SQLite para o banco de dados, Prisma como ORM, e documentação de rotas com Swagger.
- **Front-end**: Desenvolvido em NextJS, utilizando TailwindUI para estilização, Context API para autenticação, Axios para requisições REST, Cypress para testes E2E, e LocalStorage para armazenamento do access_token.

---

## Configuração e Inicialização do Back-end

### Pré-requisitos
- Node.js (versão 16 ou superior)
- NPM (ou Yarn, se preferir)

### Passo a Passo

1. **Criação do arquivo `.env`:**
   - Na raiz do projeto do back-end, crie um arquivo chamado `.env`.
   - Utilize o arquivo `.env.example` como base.
   - Adicione uma chave `JWT_SECRET` para o JWT no `.env` recém-criado. Esta chave será utilizada para gerar todos os tokens JWT. (Essa chave pode ser uma sequência de caracteres aleatórios)

2. **Instalação de dependências:**
   ```bash
   npm install
   ```

3. **Iniciar a aplicação:**
   ```bash
   npm run start
   ```

### Acessos
- A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)
- A documentação Swagger estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

---

## Configuração e Inicialização do Front-end

### Pré-requisitos
- Node.js (versão 16 ou superior)
- NPM (ou Yarn, se preferir)

### Passo a Passo

1. **Criação do arquivo `.env`:**
   - Na raiz do projeto do front-end, crie um arquivo chamado `.env`.
   - Utilize o arquivo `.env.example` como base.
   - Configure a chave `BASE_URL_API` no arquivo `.env` recém-criado.

2. **Instalação de dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Iniciar a aplicação:**
   ```bash
   npm run start
   ```

### Acessos
- A aplicação estará disponível em: [http://localhost:3333](http://localhost:3333)

---

## Informações Adicionais

### Back-end
- **Banco de Dados:** O projeto utiliza SQLite. O banco será gerado automaticamente ao executar o Prisma.
- **Testes:** Para executar os testes unitários:
  ```bash
  npm run test
  ```

### Front-end
- **Testes E2E:** Para rodar os testes End-to-End com Cypress:
  ```bash
  npm run cypress
  ```
- **Autenticação:** Caso o usuário não esteja autenticado, ele será redirecionado automaticamente para a tela de login.

---

## Considerações Finais
*Agradeço a oportunidade de realizar o teste técnico, espero vê-los novamente em breve!*

