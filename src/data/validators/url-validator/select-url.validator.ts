import { DefaultQueryFind, UrlValidator } from '../../../domain/contracts';

export class SelectUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    dataInstance.select?.forEach((item) => {
      url = `${url}&fields[]=${item}`;
    });
    return url;
  }
}
