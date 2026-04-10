
import { useState, useLayoutEffect, useCallback, useRef } from "react";

export default function useAutoHeight() {
  const ref = useRef(null);           // attach to INNER wrapper
  const containerRef = useRef(null);  // attach to OUTER form
  const [height, setHeight] = useState(null);
  const rafRef = useRef(null);

  const measure = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const newHeight = el.getBoundingClientRect().height;
      setHeight((prev) => (prev !== newHeight ? newHeight : prev));
    });
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(measure);
    const mutationObserver = new MutationObserver(measure);

    resizeObserver.observe(el);
    mutationObserver.observe(el, { childList: true, subtree: true });

    measure();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [measure]);

  return { ref, containerRef, height };
}