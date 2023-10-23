import {
  ConfigModel,
  DefaultQueryFind,
  TableModel,
} from '../../domain/contracts';
import { GetUrlGenerator } from '../../domain/features/get-url-generator';
import { makeUrlValidators } from '../factories';

export class UrlGenerator implements GetUrlGenerator {
  url = '';
  header = {
    name: 'Authorization',
    value: ''
  };

  constructor(
    private readonly config: ConfigModel,
    private readonly table?: TableModel,
    private readonly validators = makeUrlValidators()
  ) {
    this.setTable(table);
  }

  setTable(table?: TableModel): void {
    if (table) {
      this.header.value = `Bearer ${this.config.apiKey}`;
      this.url = `${this.config.baseUrl}/${table.tableName}`;
    }
  }

  getUrl(dataInstance: DefaultQueryFind, table?: TableModel): string {
    this.setTable(table);
    this.validators.forEach((validator) => {
      this.url = validator.validate(this.url, dataInstance);
    });
    return this.url;
  }

  getHeader() {
    return `'${this.header.name}': '${this.header.value}'`;
  }
}
