import { UrlGenerator } from '../../../src/data/services/url-generator';
import { ConfigModel, TableModel } from '../../../src/domain/contracts';
require('dotenv').config();

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
      area: 'singleText'
    },
  };
  const sut = new UrlGenerator(config, table);
  const initialUrl = `${config.baseUrl}/${table.tableName}`;
  return { sut, initialUrl };
};

describe('UrlGenerator', () => {
  it('Should return url correctly for empty dataInstance', () => {
    const { sut, initialUrl } = makeSut();
    expect(sut.getUrl({})).toBe(initialUrl);
  });

  // Add more test cases based on your specific use case

  // Example test cases:
  // it('Should return url correctly for select fields', () => { ... });
  // it('Should return url correctly for sorting', () => { ... });
  // it('Should return url correctly for filtering with AND operator', () => { ... });
  // it('Should return url correctly for filtering with OR operator', () => { ... });
  // it('Should return url correctly for boolean where clause with true value', () => { ... });
  // it('Should return url correctly for boolean where clause with false value', () => { ... });
});
