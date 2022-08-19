import { DefaultQueryFind, UrlValidator } from '../../../domain/contracts';

export class OrderByUrlValidator implements UrlValidator {
  validate(url: string, dataInstance: DefaultQueryFind): string {
    if (!dataInstance.orderBy) {
      return url;
    }
    Object.keys(dataInstance.orderBy).forEach((item, index) => {
      const value = (dataInstance.orderBy as any)[item];
      url = `${url}&sort[${index}][field]=${item}&sort[${index}][direction]=${value}`;
    });
    return url;
  }
}
