import { DefaultQueryFind, UrlValidator } from '../../../domain/contracts';

export class TakeUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    if (!dataInstance.take) {
      return url;
    }
    return `${url}&maxRecords=${dataInstance.take}`;
  }
}
