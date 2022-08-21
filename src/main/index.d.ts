import { ConfigModel, DataInstanceModel } from '../domain/contracts';
import { ConfigureDataInstance } from '../domain/features/configure-data-instance';

declare module '@thinkam/typeairtable' {
  export class AirTableConfig implements ConfigureDataInstance {
    configure(config: ConfigModel): DataInstanceModel;
  }
}
