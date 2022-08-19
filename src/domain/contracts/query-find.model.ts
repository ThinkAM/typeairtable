import { ColumnsModel, Field } from './table.model';

interface BaseQueryFind<T extends ColumnsModel = any> {
  where?: Where<T>;
  select?: Array<keyof T>;
  orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>;
}

export type Where<T extends ColumnsModel = any> =
  | WhereObject<T>
  | WhereObject<T>[];

type WhereObject<T extends ColumnsModel> = {
  [key in keyof T]?: WhereValue<T[key]>;
};

type WhereValue<T extends Field> = T extends 'checkBox'
  ? boolean
  : T extends 'number'
  ? number
  : string;

export interface QueryFind<T extends ColumnsModel = any>
  extends BaseQueryFind<T> {}

export interface QueryFindAll<T extends ColumnsModel = any>
  extends BaseQueryFind<T> {
  take?: number;
}

export interface DefaultQueryFind extends Partial<QueryFind> {
  take?: number;
}
