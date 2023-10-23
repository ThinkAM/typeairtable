import {
  ConvertFieldTypeValue,
  DataResult,
  DefaultData,
  QueryFind,
  QueryFindAll,
  RepositoryModel,
} from '@/domain/contracts';
import { GetUrlGenerator } from '../../domain/features/get-url-generator';
import { HttpClient } from '../protocols/http/http-client';
import { deepClone } from '../utils';

export class Repository implements RepositoryModel {
  private urlGenerator: GetUrlGenerator;
  constructor(
    urlGenerator: GetUrlGenerator,
    private readonly httpClient: HttpClient
  ) {
    this.urlGenerator = deepClone(urlGenerator);
  }

  async find<E extends QueryFind<any>>(
    params: E
  ): Promise<DataResult<any, E['select']>> {
    const header = this.urlGenerator.getHeader();
    const url = this.urlGenerator.getUrl({ ...params, take: 1 });
    const rawData = await this.httpClient.get(url, {
      header: header
    });
    const data = this.convertRawData(rawData);
    return data && data.length ? data[0] : null;
  }

  async findAll<E extends QueryFindAll<any>>(
    params: E
  ): Promise<DataResult<any, E['select']>[]> {
    const header = this.urlGenerator.getHeader();
    const url = this.urlGenerator.getUrl(params);
    const rawData = await this.httpClient.get(url, {
      header: header
    });
    return this.convertRawData(rawData);
  }

  async create(
    body: ConvertFieldTypeValue<any>
  ): Promise<ConvertFieldTypeValue<any> & DefaultData> {
    const header = this.urlGenerator.getHeader();
    const result = await this.httpClient.post(this.urlGenerator.getUrl({}), {
      fields: body,
    }, {
      header: header
    });
    return {
      ...result.fields,
      id: result.id,
      createdTime: result.createdTime,
    };
  }

  destroy(id: string): Promise<boolean> {
    const header = this.urlGenerator.getHeader();
    return this.httpClient.delete(this.urlGenerator.getUrl({}), id, {
      header: header
    });
  }

  async update(
    id: string,
    body: ConvertFieldTypeValue<any>
  ): Promise<ConvertFieldTypeValue<any> & DefaultData> {
    const header = this.urlGenerator.getHeader();
    const result = await this.httpClient.patch(this.urlGenerator.getUrl({}), {
      records: [
        {
          id,
          fields: body,
        },
      ],
    }, {
      header: header
    });
    return {
      ...result.records[0].fields,
      id: result.records[0].id,
      createdTime: result.records[0].createdTime,
    };
  }

  private convertRawData(rawData) {
    return rawData?.records?.map((item) => ({
      ...this.filterIdAndCreatedTime(item),
      ...this.filterFields(item.fields),
    }));
  }

  private filterIdAndCreatedTime(record) {
    return {
      id: record.id,
      createdTime: record.createdTime,
    };
  }

  private filterFields(fields) {
    let result = {};
    Object.keys(fields).forEach((key) => {
      const value = {};
      value[key] = fields[key];
      result = { ...result, ...value };
    });
    return result;
  }
}
