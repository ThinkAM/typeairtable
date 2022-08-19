import { UrlGenerator } from '../../../src/data/services/url-generator';
import { ConfigModel, Field, TableModel } from '../../../src/domain/contracts';

const makeSut = () => {
  const config: ConfigModel = {
    baseUrl: 'https://api.airtable.com/v0/any',
    apiKey: 'any_key',
  };
  const table: TableModel = {
    tableName: 'MyTable',
    columns: {
      name: 'singleText',
      email: 'singleText',
      password: 'singleText',
    },
  };
  const sut = new UrlGenerator(config, table);
  const initialUrl = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;
  return { sut, initialUrl };
};

describe('UrlGenerator', () => {
  it('Should return url correct if dataInstance is empty', () => {
    const { sut, initialUrl } = makeSut();
    expect(sut.getUrl({})).toBe(initialUrl);
  });

  it('Should return url correct if exists select', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&fields[]=name&fields[]=email`;
    expect(sut.getUrl({ select: ['name', 'email'] })).toBe(url);
  });

  it('Should return url correct if exists orderBy', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&sort[0][field]=name&sort[0][direction]=asc&sort[1][field]=email&sort[1][direction]=desc`;
    expect(
      sut.getUrl({
        orderBy: { name: 'asc', email: 'desc' },
      })
    ).toBe(url);
  });

  it('Should return url correct if exists where = AND operator', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=AND({name}='any_name',{email}='any_email')`;
    expect(
      sut.getUrl({
        where: { name: 'any_name', email: 'any_email' },
      })
    ).toBe(url);
  });

  it('Should return url correct if exists where = OR operator', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=OR(AND({name}='any_name',{email}='any_email'),AND({name}='any_name2'))`;
    expect(
      sut.getUrl({
        where: [
          { name: 'any_name', email: 'any_email' },
          { name: 'any_name2' },
        ],
      })
    ).toBe(url);
  });

  it('Should return url correct if where exists boolean with value equal true', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=AND(isActived)`;
    expect(
      sut.getUrl({
        where: { isActived: true },
      })
    ).toBe(url);
  });

  it('Should return url correct if where exists boolean with value equal false', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=AND(NOT(isActived))`;
    expect(
      sut.getUrl({
        where: { isActived: false },
      })
    ).toBe(url);
  });
});
