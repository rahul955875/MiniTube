import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, observerConfig);

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [handleObserver, observerConfig]);

  return observerRef;
};

export default useInfiniteScroll;
