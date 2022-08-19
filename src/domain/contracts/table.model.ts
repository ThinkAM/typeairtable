export interface TableModel {
  tableName: string;
  columns: ColumnsModel;
}

export type ColumnsModel = Record<string, Field>;

export type Field =
  | 'file'
  | 'singleText'
  | 'longText'
  | 'number'
  | 'checkBox'
  | 'attachment';

export type ConvertFieldType<T extends Field> = T extends 'number'
  ? number
  : T extends 'singleText' | 'longText'
  ? string
  : T extends 'file'
  ? any[]
  : T extends 'checkBox'
  ? boolean | undefined
  : any;

export type ConvertFieldTypeValue<T extends ColumnsModel> = {
  [key in keyof T]: ConvertFieldType<T[key]>;
};
