import { differenceWith, isEqual } from 'lodash-es';

// 深度比较两次的prop，找到新增和删除部分
export default function(val, prevVal) {
  const added = differenceWith(val, prevVal, isEqual);
  const removed = differenceWith(prevVal, val, isEqual);
  return {
    added,
    removed,
  };
}
