import { useRef, useEffect } from 'react';

// return previous value
export default function usePrevious(value, initValue) {
  const ref = useRef(initValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
