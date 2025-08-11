import { useRef, useEffect, useCallback } from "react";

type Config = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

const useInfiniteScroll = ({
  handleObserver,
  observerConfig = { root: null, rootMargin: "300px", threshold: 0 },
}: {
  handleObserver: IntersectionObserverCallback;
  observerConfig?: Config;
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  const startObserving = useCallback(() => {
    if (observerRef.current && !observerInstanceRef.current) {
      const observer = new IntersectionObserver(handleObserver, observerConfig);
      observer.observe(observerRef.current);
      observerInstanceRef.current = observer;
    }
  }, [handleObserver, observerConfig]);

  const stopObserving = useCallback(() => {
    if (observerInstanceRef.current && observerRef.current) {
      observerInstanceRef.current.unobserve(observerRef.current);
      observerInstanceRef.current.disconnect();
      observerInstanceRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopObserving(); // cleanup on unmount
  }, [stopObserving]);

  return { observerRef, startObserving, stopObserving };
};

export default useInfiniteScroll;
