import { DataInstanceModel, TableModel } from '.';

export interface ConfigureInstanceModel {
  getInstance(table: TableModel): DataInstanceModel;
}
