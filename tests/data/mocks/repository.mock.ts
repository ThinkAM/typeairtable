import { HttpClient } from '../../../src/data/protocols/http/http-client';
import { Repository } from '../../../src/data/services/repository';
import { UrlGenerator } from '../../../src/data/services/url-generator';

export const makeSutRepository = () => {
  const baseUrl = 'any_url';
  const apiKey = 'any_api';
  const name = 'any_name';
  const urlGenerator = new UrlGenerator(
    { baseUrl, apiKey },
    { tableName: 'any_name', columns: { name: 'singleText' } }
  );
  const httpClientMock: jest.Mocked<HttpClient> = {
    get: jest.fn(<T = any>(_url: string) => Promise.resolve({} as T)),
    post: jest.fn(<T = any, B = any>(_url: string, _body: B) =>
      Promise.resolve({} as T)
    ),
    delete: jest.fn((_url: string, _id: string) => Promise.resolve(true)),
    patch: jest.fn(<T = any, B = any>(_url: string, _body: B) =>
      Promise.resolve({} as T)
    ),
  };
  const sut = new Repository(urlGenerator, httpClientMock);
  const url = `${baseUrl}/${name}?api_key=${apiKey}`;
  return { sut, httpClientMock, url, urlGenerator };
};
