import { DefaultQueryFind } from './query-find.model';

export interface UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string;
}
