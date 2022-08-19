import { UrlValidator } from '../../domain/contracts';
import {
  SelectUrlValidator,
  WhereUrlValidator,
  OrderByUrlValidator,
  TakeUrlValidator,
} from '../validators/url-validator';

export const makeUrlValidators = (): UrlValidator[] => {
  const selectValidator = new SelectUrlValidator();
  const whereValidator = new WhereUrlValidator();
  const oderByValidator = new OrderByUrlValidator();
  const takeValidator = new TakeUrlValidator();
  return [selectValidator, whereValidator, oderByValidator, takeValidator];
};
