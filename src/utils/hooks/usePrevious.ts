import { useRef, useEffect } from 'react';

// return previous value
export default function usePrevious(value: any, initValue:any = undefined) {
  const ref = useRef(initValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
