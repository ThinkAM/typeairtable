import { QueryFind, QueryFindAll } from './query-find.model';
import {
  ColumnsModel,
  ConvertFieldType,
  ConvertFieldTypeValue,
} from './table.model';

type Data<T extends ColumnsModel, F extends any[] | unknown> = {
  [key in F extends any[] ? F[number] : keyof T]: ConvertFieldType<T[key]>;
} & DefaultData;

export type DefaultData = {
  id: string;
  createdTime: string;
};

export type DataResult<
  T extends ColumnsModel,
  F extends any[] | unknown
> = Data<T, F>;

export interface RepositoryModel<T extends ColumnsModel = any> {
  find<E extends QueryFind<T>, A = any>(params: E, headers: A): Promise<DataResult<T, E['select']>>;

  findAll<E extends QueryFindAll<T>, A = any>(
    params: E
  ): Promise<DataResult<T, E['select']>[]>;

  create<A = any>(
    body: ConvertFieldTypeValue<T>, headers: A
  ): Promise<ConvertFieldTypeValue<T> & DefaultData>;

  destroy<A = any>(id: string): Promise<boolean>;

  update<A = any>(
    id: string,
    body: ConvertFieldTypeValue<T>, headers: A
  ): Promise<ConvertFieldTypeValue<T> & DefaultData>;
}
