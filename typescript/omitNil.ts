import { pickBy } from 'lodash-es';

export default obj =>
  pickBy(obj, value => value !== undefined && value !== null);
