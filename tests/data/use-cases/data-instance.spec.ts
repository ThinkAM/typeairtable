import { DataInstance } from '@/data/services/data-instance';
import { Repository } from '@/data/services/repository';
import { Field } from '@/domain/contracts';
import { makeSutRepository } from '../mocks';

const makeSut = () => {
  const { urlGenerator, httpClientMock } = makeSutRepository();
  const sut = new DataInstance(urlGenerator, httpClientMock);
  return { sut };
};

describe('DataInstance', () => {
  it('Should return type DataInstance', () => {
    const { sut } = makeSut();
    const result = sut.getRepository({
      tableName: 'Produtos',
      columns: { id: 'singleText', nameUser: 'singleText' },
    });

    expect(result instanceof Repository).toBe(true);
  });
});
