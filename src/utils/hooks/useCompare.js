import { isEqual } from 'lodash-es';
import usePrevious from './usePrevious';

// compare current value with previous value, return true if they are different
export default function useCompare(...args) {
  const callback = args[args.length - 1];
  const vals = typeof callback === 'function' ? args.slice(0, args.length - 1) : args;
  const prevVals = usePrevious(
    vals,
    vals.map(() => undefined),
  );
  const isDifferent = !isEqual(prevVals, vals);
  if (isDifferent && typeof callback === 'function') {
    callback(...vals);
  }
  return isDifferent;
}
