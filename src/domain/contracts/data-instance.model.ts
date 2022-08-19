import { RepositoryModel, TableModel } from '.';

export interface DataInstanceModel {
  getRepository<T extends TableModel>(table: T): RepositoryModel<T['columns']>;
}
