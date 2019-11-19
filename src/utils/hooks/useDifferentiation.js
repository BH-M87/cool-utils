import { differenceWith, isEqual } from 'lodash-es';
import usePrevious from './usePrevious';

// 深度比较两次的prop，找到新增和删除部分
export default function(val) {
  const prevVal = usePrevious(val);
  const added = differenceWith(val, prevVal, isEqual);
  const removed = differenceWith(prevVal, val, isEqual);
  return {
    added,
    removed,
  };
}
