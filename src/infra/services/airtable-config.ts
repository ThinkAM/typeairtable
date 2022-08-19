import { DataInstance } from '@/data/services/data-instance';
import { UrlGenerator } from '@/data/services/url-generator';
import { ConfigModel, DataInstanceModel } from '@/domain/contracts';
import { ConfigureDataInstance } from '@/domain/features/configure-data-instance';
import { HttpAxiosClient } from '../providers/http/http-axios-client';

export class AirTableConfig implements ConfigureDataInstance {
  configure(config: ConfigModel): DataInstanceModel {
    const urlGenerator = new UrlGenerator(config);
    const httpAxiosClient = new HttpAxiosClient();
    return new DataInstance(urlGenerator, httpAxiosClient);
  }
}
