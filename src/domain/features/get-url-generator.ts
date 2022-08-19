import { DefaultQueryFind, TableModel } from '../contracts';

export interface GetUrlGenerator {
  setTable(table: TableModel): void;
  getUrl(dataInstance: DefaultQueryFind): string;
}
