import { UrlGenerator } from '../../../src/data/services/url-generator';
import { ConfigModel, TableModel } from '../../../src/domain/contracts';

// Função auxiliar para criar um objeto "Lead"
const createLead = (name, cellphone, email, area) => {
  return { name, cellphone, email, area };
};

const makeSut = () => {
  const config: ConfigModel = {
    baseUrl: process.env.AIRTABLE_BASE_URL || '',
    apiKey: process.env.AIRTABLE_API_KEY || ''
  };
  const table: TableModel = {
    tableName: 'Lead',
    columns: {
      name: 'singleText',
      cellphone: 'singleText',
      email: 'singleText',
      area: 'singleText',
    },
  };
  const sut = new UrlGenerator(config, table);
  const initialUrl = `${config.baseUrl}/${table.tableName}`;
  return { sut, initialUrl };
};

describe('Lead CRUD', () => {
  it('Should create a Lead with POST request', () => {
    const { sut, initialUrl } = makeSut();
    const lead = createLead('John Doe', '123-456-7890', 'john@example.com', 'Sales');

    // Test the URL and HTTP method for creating a lead
    // Make the POST request to create the lead
    // Assert the response or status code
  });

  it('Should retrieve a Lead with GET request', () => {
    const { sut, initialUrl } = makeSut();
    // Test the URL and HTTP method for retrieving a lead
    // Make the GET request to retrieve the lead
    // Assert the response or status code
  });

  it('Should update a Lead with PATCH request', () => {
    const { sut, initialUrl } = makeSut();
    const lead = createLead('John Doe', '123-456-7890', 'john@example.com', 'Sales');
    // Create the lead first using a POST request
    // Test the URL and HTTP method for updating a lead
    // Make the PATCH request to update the lead
    // Assert the response or status code
  });

  it('Should delete a Lead with DELETE request', () => {
    const { sut, initialUrl } = makeSut();
    // Test the URL and HTTP method for deleting a lead
    // Make the DELETE request to delete the lead
    // Assert the response or status code
  });
});
