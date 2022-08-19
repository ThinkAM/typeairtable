import { ConfigModel, DataInstanceModel } from '../contracts';

export interface ConfigureDataInstance {
  configure(config: ConfigModel): DataInstanceModel;
}
