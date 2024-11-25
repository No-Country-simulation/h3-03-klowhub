import { RefObject, useEffect, useState, useRef, useCallback } from 'react'

type Res = {
  width: number | undefined
  height: number | undefined
}

export const useDimensions = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, portalNode?: HTMLElement | null): Res => {
  const [dimensions, setDimensions] = useState<Res>({ width: undefined, height: undefined })
  const observerRef = useRef<MutationObserver | null>(null);

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      setDimensions({ width: ref.current?.offsetWidth, height: ref.current?.offsetHeight })
    };
  }, [ref]);

  useEffect(() => {
    updateDimensions();
    if (portalNode) {
      const observer = new MutationObserver(() => updateDimensions());
      observer.observe(portalNode, { childList: true });
      observerRef.current = observer
    }

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null
      };
    };
  }, [ref, portalNode, updateDimensions]);

  return dimensions
}
