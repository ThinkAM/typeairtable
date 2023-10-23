import { LeadService } from './lead.service';

describe('Lead Service', () => {
  it('Should create a Lead in the test database', async () => {
    // Crie uma instância do LeadService
    const leadService = new LeadService();

    // Dados de teste para criar um Lead
    const leadData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphone: '123-456-7890',
      area: 'Sales',
    };

    // Chame o método create no LeadService
    const createdLeadId = await leadService.create(leadData);

    // Realize asserções para verificar se o Lead foi criado com sucesso na base de dados de teste
    expect(createdLeadId).not.toBeNull();
  });
});
