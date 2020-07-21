import { useRef, useEffect } from 'react';

// return previous prop
export default function usePreviousProp<T>(value: T, initValue?: T): T | undefined {
  const ref = useRef<T | undefined>(initValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
