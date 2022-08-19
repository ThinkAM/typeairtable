import {
  DataInstanceModel,
  RepositoryModel,
  TableModel,
} from '@/domain/contracts';
import { GetUrlGenerator } from '@/domain/features/get-url-generator';
import { HttpClient } from '../protocols/http/http-client';
import { Repository } from './repository';

export class DataInstance implements DataInstanceModel {
  constructor(
    private readonly urlGenerator: GetUrlGenerator,
    private readonly httpClient: HttpClient
  ) {}

  getRepository<T extends TableModel>(table: T) {
    this.urlGenerator.setTable(table);
    return new Repository(
      this.urlGenerator,
      this.httpClient
    ) as RepositoryModel;
  }
}
