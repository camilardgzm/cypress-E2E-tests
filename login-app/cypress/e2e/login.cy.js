describe('Login Page - E2E TESTS', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  });

  it('Logs in succesfully with valid credentials', () => {
    cy.get('#email').type('usuario@valido.com');
    cy.get('#password').type('contraseña123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido');
  });
  
  it('Shows error message with invalid credentials', () => {
    cy.get('#email').type('usuario@valido.com');
    cy.get('#password').type('contraseña_incorrecta');
    cy.get('button[type="submit"]').click();
    cy.contains('Credenciales incorrectas');
    cy.url().should('include', '/login');
  } );

    it('Shows an error when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Por favor, ingresa tus datos');
  });

})