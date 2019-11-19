import { isEqual } from 'lodash-es';
import usePrevious from './usePrevious';

// compare current value with previous value, return true if they are different
export default function(...args) {
  if (args.length === 0) {
    return false;
  }
  const callback = args[args.length - 1];
  const vals = typeof callback === 'function' ? args.slice(0, args.length - 1) : args;
  const prevVals = vals.map(val => usePrevious(val));
  const isDifferent = !isEqual(prevVals, vals);
  if (isDifferent && typeof callback === 'function') {
    callback(...vals);
  }
  return isDifferent;
}
