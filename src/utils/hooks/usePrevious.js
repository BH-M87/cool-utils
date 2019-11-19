import { useRef, useEffect } from 'react';

// return previous value
export default function(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
