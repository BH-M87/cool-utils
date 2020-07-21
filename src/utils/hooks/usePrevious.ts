import { useRef } from 'react';

// return previous value
export default function usePrevious<T>(value: T, initValue?: T): T | undefined {
  const prevRef = useRef<T | undefined>();
  const curRef = useRef<T | undefined>(initValue);
  prevRef.current = curRef.current;
  curRef.current = value;
  return prevRef.current;
}
