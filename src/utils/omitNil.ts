import { pickBy } from 'lodash-es';

export default (obj: AnyObject) =>
  pickBy(obj, value => value !== undefined && value !== null);
