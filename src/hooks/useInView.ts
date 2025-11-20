"use client";
import { useEffect, useRef } from "react";

export function useIntersectionObserver(cb: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cb();
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [cb, enabled]);

  return ref;
}
