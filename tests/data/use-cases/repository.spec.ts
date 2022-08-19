import { makeSutRepository } from '../mocks';

describe('Repository', () => {
  it('Should calls url in the method get of httpClient', async () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'get');
    await sut.find({});
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(`${url}&maxRecords=1`);
  });
  it('Should calls correct body on create', () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'post');
    const body = {
      name: 'any_name',
    };
    sut.create(body);
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(url, { fields: body });
  });
  it('Should calls correct body on destroy', () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'delete');
    const id = 'any_id';
    sut.destroy(id);
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(url, id);
  });
  it('Should calls correct body on update', () => {
    const { sut, httpClientMock, url } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'patch');
    const id = 'any_id';
    const body = {
      name: 'any_name_2',
    };
    httpClientSpy.mockResolvedValue({
      records: [
        {
          id,
          createdTime: '2022-07-29T12:18:09.000Z',
          fields: body,
        },
      ],
    });
    sut.update(id, body);
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(url, {
      records: [
        {
          id,
          fields: body,
        },
      ],
    });
  });
});
