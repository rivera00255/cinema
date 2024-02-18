import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (targetRef: RefObject<HTMLDivElement | null>) => {
  const observerRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersecting] = useState(false);

  const handleObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) =>
        setIntersecting(entries.some((entry) => entry.isIntersecting))
      );
    }
    return observerRef.current;
  }, [observerRef.current]);

  useEffect(() => {
    if (targetRef.current) {
      handleObserver().observe(targetRef.current);
    }
    return () => handleObserver().disconnect();
  }, [targetRef.current]);

  return intersecting;
};

export default useIntersectionObserver;
