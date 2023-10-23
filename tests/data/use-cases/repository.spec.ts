import { makeSutRepository } from '../mocks';

describe('Repository', () => {
  it('Should call the "get" method of httpClient with the correct parameters', async () => {
    const { sut, httpClientMock, url, config } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'get');
    await sut.find({});
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(`${url}&maxRecords=1`, config);
  });

  it('Should call the "post" method of httpClient with the correct parameters for create', () => {
    const { sut, httpClientMock, url, config } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'post');
    const body = {
      name: 'any_name',
    };
    sut.create(body);
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(url, { fields: body }, config);
  });

  it('Should call the "delete" method of httpClient with the correct parameters for destroy', () => {
    const { sut, httpClientMock, url, config } = makeSutRepository();
    const httpClientSpy = jest.spyOn(httpClientMock, 'delete');
    const id = 'any_id';
    sut.destroy(id);
    expect(httpClientSpy).toHaveBeenCalledTimes(1);
    expect(httpClientSpy).toHaveBeenCalledWith(url, id, config);
  });

  it('Should call the "patch" method of httpClient with the correct parameters for update', () => {
    const { sut, httpClientMock, url, config } = makeSutRepository();
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
    }, config);
  });
});
